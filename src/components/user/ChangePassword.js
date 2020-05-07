import React, { useState } from "react";
import LayoutStudent from "../pages/LayoutStudent";
import LayoutTeacher from "../pages/LayoutTeacher";
import Layout from "../pages/Layout";

import { Role } from "../../constants";
import { isAuthenticated } from "../auth";
const ChangePassword = () => {
  const [UserPasswordCurrent, setUserPasswordCurrent] = useState("");
  const [UserPasswordNew1, setUserPasswordNew1] = useState("");
  const [UserPasswordNew2, setUserPasswordNew2] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const user = isAuthenticated();

  const hangleSubmitChangePassword = (e) => {
    e.preventDefault();
    setSuccess("Password change - work in progress");
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

  const showChangePassword = () => {
    return (
      <div id="forgot-password" style={{ marginTop: "10px" }}>
        <h5>Change Password:</h5>
        <br />
        <form onSubmit={hangleSubmitChangePassword}>
          <label>Current Password:</label>
          <input
            type="password"
            className="form-control"
            id="email"
            name="UserPasswordCurrent"
            value={UserPasswordCurrent}
            onChange={(e) => setUserPasswordCurrent(e.target.value)}
            placeholder="Enter your current password"
            required
          />
          <br />
          <label>New Password:</label>
          <input
            type="password"
            className="form-control"
            id="email"
            name="UserPasswordNew1"
            value={UserPasswordNew1}
            onChange={(e) => setUserPasswordNew1(e.target.value)}
            placeholder="Enter your new password"
            required
          />
          <br />

          <label>Re-enter New Password:</label>
          <input
            type="password"
            className="form-control"
            id="email"
            name="UserPasswordNew2"
            value={UserPasswordNew2}
            onChange={(e) => setUserPasswordNew2(e.target.value)}
            placeholder="Re-enter your password"
            required
          />
          <div className="text-center mt-2">
            <button type="submit" className="btn btn-info py-2 mt-2">
              CHANGE PASSWORD
            </button>
          </div>
        </form>

        <div className="row mt-4">
          <div className="col-12">
            {showError()}
            {showSuccess()}
          </div>
        </div>
      </div>
    );
  };
  return <Layout>{showChangePassword()}</Layout>;
};

export default ChangePassword;
