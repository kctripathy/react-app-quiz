import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";

import Layout from "../pages/Layout";
import { login, authenticate, isAuthenticated } from "../auth";
import { Role } from "../../constants";
import Spinner from "../common/Spinner";

function Login() {
  const [values, setValues] = useState({
    AccountId: 0,
    UserName: "",
    UserEmail: "adc@gmail.com",
    UserPassword: "adc",
    UserPhone: "",
    loading: false,
    error: "",
    redirectToReferer: "",
  });

  const {
    AccountId,
    UserName,
    UserEmail,
    UserPassword,
    UserPhone,
    error,
    loading,
    redirectToReferer,
  } = values;
  const user = isAuthenticated();

  const handleOnChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    login({ AccountId, UserName, UserEmail, UserPhone, UserPassword }).then(
      (data) => {
        if (data === undefined) {
          setValues({
            ...values,
            error: "Some error occured!",
            loading: false,
          });
        } else if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          //console.log("data:",data);
          if (data.status.code < 0) {
            setValues({
              ...values,
              error: data.status.message,
              loading: false,
            });
          } else {
            authenticate(data, () => {
              setValues({
                ...values,
                redirectToReferer: "/",
                error: "",
                loading: false,
              });
            });
          }
        }
      }
    );
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () => (
    <div
      className="alert alert-info"
      style={{ display: loading ? "" : "none" }}
    >
      <Spinner title="Logging in to the system....Please wait a while" />
    </div>
  );

  const redirectUser = () => {
    debugger;
    if (redirectToReferer) {
      if (user && user.accessLevel === Role.SuperAdmin)
        return <Redirect to="/superAdmin/dashboard" />;
      else if (user && user.accessLevel === Role.Admin)
        return <Redirect to="/admin/dashboard" />;
      else if (user && user.accessLevel === Role.Teacher)
        return <Redirect to="/teacher/dashboard" />;
      else if (user && user.accessLevel === Role.Student)
        return <Redirect to="/student/dashboard" />;
      else return <Redirect to="/user/dashboard" />;
    }
  };

  const loginForm = () => (
    <form onSubmit={handleFormSubmit}>
      <div className="card border-dark rounded-0">
        <div className="card-header p-0">
          <div className="bg-card-header text-dark text-left p-2">
            <h5>User Login</h5>
          </div>
        </div>
        <div className="card-body p-3">
          <div className="form-group">
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text user-additional-info-label">
                  <i className="fa fa-envelope text-info mr-2"></i>
                  Email:
                </div>
              </div>
              <input
                type="email"
                className="form-control"
                id="UserEmail"
                name="UserEmail"
                value={UserEmail}
                onChange={handleOnChange("UserEmail")}
                placeholder="Email address"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text user-additional-info-label">
                  <i className="fa fa-key text-info mr-2"></i>
                  Password:
                </div>
              </div>
              <input
                type="password"
                className="form-control"
                id="UserPassword"
                name="UserPassword"
                value={UserPassword}
                onChange={handleOnChange("UserPassword")}
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <div className="text-center">
            <input
              type="submit"
              value="LOGIN"
              className="btn btn-info pl-4 pr-4 mr-2"
            />
          </div>
        </div>
      </div>
    </form>
  );
  return (
    <Layout>
      <div className="row m-0 p-0 login">
        <div className="col-lg-3 col-sm-12"></div>
        <div className="col-lg-6 col-sm-12">
          {showError()}
          {showLoading()}
          {loginForm()}
          {redirectUser()}
        </div>
        <div className="col-lg-3 col-sm-12"></div>
      </div>
      <div className="text-center mt-2">
        <br />
        <Link to="/user/forgot-password">Forgot Password?</Link>
        <br />
        <Link to="/register">New User? Register</Link>
      </div>
    </Layout>
  );
}

export default Login;
