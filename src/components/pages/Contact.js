import React, { useState } from "react";
//import emailjs from 'emailjs-com';
import sendEmail from "../common/SendEmail";

import Layout from "./Layout";

function Contact() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Subject, setSubject] = useState("");
  const [Message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFormSubmit = (e) => {
    //alert("e=",e);
    e.preventDefault();
    setIsProcessing(true);
    setSuccess("");
    setError("");

    const templateId = "quiz_contact_from";
    sendEmail(templateId, {
      mail_message: Message,
      mail_subject: Subject,
      mail_from: Name,
      mail_reply_to: Email,
    })
      .then((res) => {
        debugger;
        if (res.status === 200) {
          setSuccess("Successfully sent the mail");
          setError("");
        } else {
          setSuccess("");
          setError(`Failed to send email! ${res.text}`);
        }
        setIsProcessing(false);
      })
      .catch((err) => {
        debugger;
        setIsProcessing(false);
        setSuccess("");
        setError(`Failed to send email because: ${err}`);
      });
  };

  // const sendEmail = (templateId, templateParams) => {
  //     //debugger;
  //     //emailjs.send('gmail', templateId, templateParams,'user_Gy471SZKGgbwVNvzqjYeq')
  //     //    .then(res => {
  //     //        debugger;
  //     //        setSuccess('Email successfully sent!')
  //     //    })
  //     //    .catch(err => {
  //     //        debugger;
  //     //        setError('Oh well, you failed. Here some thoughts on the error that occured:', err)
  //     //    })

  //     // try {
  //     //     debugger;
  //     //     emailjs.send('gmail', templateId, templateParams, 'user_Gy471SZKGgbwVNvzqjYeq')
  //     //         .then(res => {
  //     //             debugger;
  //     //             setSuccess('Email successfully sent!')
  //     //         })
  //     //         .catch(err => {
  //     //             debugger;
  //     //             setError('Oh well, you failed. Here some thoughts on the error that occured:', err)
  //     //         })
  //     // }
  //     // catch (e) {
  //     //     alert(e);
  //     // }
  // };

  const contactForm = () => {
    return (
      <div>
        <form onSubmit={handleFormSubmit}>
          <div className="card border-text-muted rounded-0 mb-4">
            <div className="card-header p-0">
              <div className="bg-card-header text-dark text-left py-2">
                <h5>Contact</h5>
              </div>
            </div>
            <div className="card-body p-3">
              <div className="form-group">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fa fa-user text-info"></i>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="user_name"
                    name="user_name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fa fa-envelope text-info"></i>
                    </div>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    id="user_email"
                    name="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fa fa-user text-info"></i>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="mail_subject"
                    name="mail_subject"
                    value={Subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter mail subject"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fa fa-comment text-info"></i>
                    </div>
                  </div>
                  <textarea
                    className="form-control"
                    id="mail_message"
                    name="mail_message"
                    placeholder="Please enter your message here"
                    value={Message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="text-center">
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info rounded-0 py-2"
                />
              </div>
            </div>
          </div>
        </form>

        {/* <div className="text-center">
                    <input type="submit" value="Send Password Reset Link" onClick={sendPasswordResestLink} className="btn btn-info rounded-0 py-2" />
                </div> */}
      </div>
    );
  };

  const address = () => {
    return (
      <div className="card bg-light mb-3 mt-5">
        <div className="bg-card-header bg-info text-dark">
          <h5>
            <i className="fa fa-home"></i> Address
          </h5>
        </div>
        <div className="card-body">
          #209, 2nd Main Road
          <br />
          Kasturi Nagar
          <br />
          Bengaluru – 560043
          <br />
          Karnataka (India)
          <br />
          <br />
          Phone: <a href="tel:8660865440"> + (91) 86608 65440</a>
          <br /> Email:
          <a href="mailto:hr@odiware.com" target="_blank">
            hr@odiware.com
          </a>
        </div>
      </div>
    );
  };

  const showError = () => (
    <div
      className="alert alert-danger text-center"
      style={{ display: error.length > 0 ? "" : "none" }}
    >
      <b>{error}</b>
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success text-center"
      style={{ display: success.length > 0 ? "" : "none" }}
    >
      <b>{success}</b>
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
    <Layout>
      <div className="row" style={{ paddingBottom: "20px" }}>
        <div className="col-lg-6 col-sm-12">
          {contactForm()}
          {showSuccess()}
          {showError()}
          {showProcessing()}
        </div>
        <div className="col-lg-2 co-sm-12"></div>
        <div className="col-lg-4 co-sm-12 user-contact-image">{address()}</div>
      </div>
    </Layout>
  );
}

export default Contact;
