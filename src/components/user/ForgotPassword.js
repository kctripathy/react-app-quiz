import React, { useState } from "react";
import sendEmail from "../common/SendEmail";
import { getResetPasswordLink } from "../admin";
import { WEB_URL } from "../../config";

import Layout from "../pages/Layout";

const ForgotPasword = () => {
  const [UserEmail, setUserEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const sendPasswordResestLink = (authKey) => {
    const templateId = "forgot_password_link";
    const resetLinkURL = `${WEB_URL}/user/reset-password/${authKey}`;
    const resetLinkHtml = `<a href='${resetLinkURL}' target='_blank'>Reset Password</a>`;
    //debugger;
    console.log(resetLinkURL);

    sendEmail(templateId, {
      message_html: resetLinkHtml,
      to_name: "User",
      to_mail: UserEmail,
    })
      .then((res) => {
        debugger;
        if (res.status === 200) {
          setSuccess(
            `Please check your email (${UserEmail}) to reset your password`
          );
          setUserEmail("");

          setError("");
          // return true;
        } else {
          setSuccess("");
          setError("Failed to send email");
          // return false;
        }
        setIsProcessing(false);
      })
      .catch((err) => {
        // debugger;
        setIsProcessing(false);
        setSuccess("");
        setError(`Failed to send email because: ${err}`);
        //return false;
      });
  };

  const hangleSubmitForgotPassword = (e) => {
    e.preventDefault();
    //setIsProcessing(true);
    //setSuccess(`Mail has been sent`);
    //alert('mail sent!? work on progress');
    getResetPasswordLink({ UserEmail: UserEmail })
      .then((data) => {
        debugger;
        console.log(data);
        if (Number(data.status.code) > 0) {
          sendPasswordResestLink(data.result);
        } else {
          setError(
            "Failed to get the password reset link because " + data.result
          );
          setSuccess("");
        }
        setIsProcessing(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setSuccess("");
        setIsProcessing(false);
      });
  };

  const showError = () => (
    <div
      className="alert alert-danger text-center"
      style={{ display: error.length > 0 ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success text-center"
      style={{ display: success.length > 0 ? "" : "none" }}
    >
      {success}
    </div>
  );

  const showProcessing = () => (
    <div
      className="alert alert-info text-center"
      style={{ display: isProcessing ? "" : "none" }}
    >
      <b>Processing.... please wait a while!</b>
    </div>
  );

  return (
    <Layout title="Forgot Pasword">
      <div id="row m-0 p-0 forgot-password">
        <form onSubmit={hangleSubmitForgotPassword}>
          <label htmlFor="email">Login/Email ID:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="UserEmail"
            value={UserEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter your registred email address (LoginID) to receive your password"
            required
          />

          <button
            type="submit"
            className="btn btn-info btn-block rounded-0 py-2 mt-2"
          >
            SEND MY PASSWORD
          </button>
        </form>

        <div className="row mt-4">
          <div className="col-12">
            {showError()}
            {showSuccess()}
            {showProcessing()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPasword;
