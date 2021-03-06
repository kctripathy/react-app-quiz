import React, { useState, Fragment, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { register, isAuthenticated } from "../auth";
import { Role } from "../../constants";
import Spinner from "./Spinner";

import {
  updateUser,
  getAllClassSubjectsByAccountId,
  removeDuplicates,
} from "../admin/index";

function Register(props) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [values, setValues] = useState({
    Id: 0,
    AccountId: 1,
    FullName: "",
    UserName: "",
    UserEmail: "",
    UserPhone: "",
    UserPassword: "",
    ClassId: 1,
    SubjectIds: [],
    AccessLevel: 100,
    AllowLogin: true,
    error: "",
    success: "",
    redirectToReferer,
  });
  const [userClasses, setUserClasses] = useState([]);

  const {
    Id,
    AccountId,
    FullName,
    UserName,
    UserEmail,
    UserPhone,
    UserPassword,
    ClassId,
    SubjectIds,
    AccessLevel,
    AllowLogin,
    error,
    success,
    redirectToReferer,
  } = values;

  //===================================================
  //
  //===================================================
  useEffect(() => {
    //debugger;
    const user = isAuthenticated();
    getAllClassSubjectsByAccountId(user.accountId).then((data1) => {
      if (data1 !== undefined) {
        const allClasses = removeDuplicates(data1.result, "classID");
        setUserClasses(allClasses);
      }
    });
    //===========================================================================
    // Edit mode : setting values that comes from list page:
    //===========================================================================
    if (
      props &&
      props.user !== undefined &&
      props.user.length > 0 &&
      props.mode === "edit"
    ) {
      setValues({
        ...values,
        Id: props.user[0].id,
        accountId: props.user[0].accountId,
        FullName: props.user[0].fullname,
        UserEmail: props.user[0].userEmail,
        UserPhone: props.user[0].userPhone || "0000000000",
        UserPassword: props.user[0].userPassword,
        AccessLevel: props.user[0].accessLevel,
        ClassId: props.user[0].classId,
        AllowLogin: props.user[0].allowLogin,
        isLoading: false,
        error: "",
      });
    }
  }, [props]);

  //===================================================
  //
  //===================================================
  const handleOnChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
    });
  };

  //===================================================
  //
  //===================================================
  const handleClassChange = (e) => {
    //e.preventDefault();
    setValues({
      ...values,
      ClassId: Number(e.target.value),
    });
  };

  //===================================================
  //
  //===================================================
  const handleAccessLevelChange = (e) => {
    //e.preventDefault();
    setValues({
      ...values,
      AccessLevel: Number(e.target.value),
    });
  };

  //===================================================
  //
  //===================================================

  const handleAllowLoginChange = (e) => {
    //e.preventDefault();
    //debugger;
    setValues({
      ...values,
      AllowLogin: e.target.checked,
    });
  };

  //===================================================
  //
  //===================================================
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const newClassId = ClassId || 1;
    if (props.mode === "edit") {
      //alert('updated....');
      await updateUser({
        Id,
        AccountId,
        FullName,
        UserName,
        UserEmail,
        UserPassword,
        UserPhone,
        ClassId: newClassId,
        AccessLevel,
        AllowLogin,
      })
        .then((response) => {
          //console.log(response);
          setIsProcessing(false);
          if (response.status.code === "1") {
            setValues({
              ...values,
              success: "Record updated successfully",
              error: "",
            });
          } else {
            setIsProcessing(false);
            setValues({
              ...values,
              error: "Failed to update the record",
              success: "",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setIsProcessing(false);
          setValues({ ...values, error: err, success: "" });
        });

      return;
    }
    //const user = isAuthenticated();
    //const userClassId = user.accessLevel > 1 ? ClassId : 1;
    await register({
      AccountId: isAuthenticated().accountId,
      FullName,
      UserName,
      UserEmail,
      UserPhone,
      UserPassword,
      ClassId: newClassId,
      AccessLevel,
    })
      .then((data) => {
        setIsProcessing(false);

        if (data === undefined) {
          setValues({ ...values, error: "some error occured", success: false });
        } else if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else if (data.status.code < 0) {
          setValues({ ...values, error: data.status.message, success: false });
        } else {
          setValues({
            ...values,
            FullName: "",
            UserName: "",
            UserEmail: "",
            UserPhone: "",
            UserPassword: "",
            classId: 0,
            subjectIds: [],
            error: "",
            success: "Succesfully created the new account ",
          });
        }
      })
      .catch((err) => {
        setIsProcessing(false);
        setValues({
          ...values,
          error: "Some error occured: " + err,
          success: false,
        });
        console.log(err);
      });
  };

  //===================================================
  //
  //===================================================
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  //===================================================
  //
  //===================================================
  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success.length > 0 ? "" : "none" }}
    >
      {values.success}
    </div>
  );

  //===================================================
  //
  //===================================================
  const showProcessing = () =>
    isProcessing && (
      <div className="col-12 text-center">
        <Spinner />
      </div>
    );

  //===================================================
  //This section will be shown to everyone for registering an account
  //===================================================
  const userRegistrationForm = () => (
    <form onSubmit={handleFormSubmit}>
      <div className="card border-dark rounded-0">
        <div className="card-header p-0">
          <div className="bg-card-header text-dark text-left py-2">
            <h5>
              {/* <i className="fa fa-user ml-10"></i>&nbsp; */}
              {props.isAdmin === "yes"
                ? props.mode === "edit"
                  ? "Edit User"
                  : "Add New User"
                : "User Registration"}
              {/* <i className="fa fa-user mr-10"></i> */}
            </h5>

            {/* isAdmin: {props.isAdmin} */}
          </div>
        </div>
        <div className="card-body p-3">
          <div className="form-group">
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text user-additional-info-label">
                  Name:
                </div>
              </div>
              <input
                type="text"
                className="form-control"
                id="name"
                name="FullName"
                value={FullName}
                onChange={handleOnChange("FullName")}
                placeholder="Enter Full Name"
                required
              />
              <label className="text-danger ml-2">*</label>
            </div>
          </div>

          {/* <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-user text-info"></i></div>
                                </div>
                                <input type="text" className="form-control" 
                                          id="name" 
                                          name="UserName" 
                                          value={UserName} 
                                          onChange={handleOnChange('UserName')}
                                          placeholder="Enter your User Name (can log on with this)" />
                            </div>
                        </div> */}

          <div className="form-group">
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text user-additional-info-label">
                  Email:
                </div>
              </div>
              <input
                type="email"
                className="form-control"
                id="email"
                name="UserEmail"
                value={UserEmail}
                onChange={handleOnChange("UserEmail")}
                placeholder="Email address"
                required
              />
              <label className="text-danger ml-2">*</label>
            </div>
          </div>

          <div className="form-group">
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text user-additional-info-label">
                  Password:
                </div>
              </div>
              <input
                type="password"
                className="form-control"
                id="password"
                name="UserPassword"
                value={UserPassword}
                onChange={handleOnChange("UserPassword")}
                placeholder="Enter password"
                required
              />
              <label className="text-danger ml-2">*</label>
            </div>
          </div>
          {props.isAdmin === "yes" ? newUserAdditionalInformation() : ""}
          <div className="text-center">
            <input
              type="submit"
              value={
                props.isAdmin
                  ? props.mode === "edit"
                    ? "UPDATE USER"
                    : "SAVE USER"
                  : "REGISTER"
              }
              className="btn btn-info rounded-0 py-2"
            />
          </div>
        </div>
      </div>
    </form>
  );

  //===================================================
  //This section will only be shown to admin while creating a new user
  //===================================================
  const newUserAdditionalInformation = () => {
    return (
      <Fragment>
        <div className="form-group">
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text user-additional-info-label">
                Phone:
              </div>
            </div>
            <input
              type="number"
              className="form-control"
              id="phone"
              name="UserPhone"
              value={UserPhone}
              onChange={handleOnChange("UserPhone")}
              placeholder="Enter phone number"
              required
            />
            <label className="text-white ml-2">-</label>
          </div>
        </div>

        <div className="form-group">
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text user-additional-info-label">
                Role:{" "}
              </div>
            </div>
            <select
              className="input-group-prepend col-4"
              onChange={handleAccessLevelChange}
              name="AccessLevel"
              value={AccessLevel}
            >
              <option value={Role.Student}>Student</option>
              <option value={Role.Teacher}>Teacher</option>
              <option value={Role.Admin}>Admin</option>
              <option value={Role.User}>User</option>
            </select>

            <div
              className="input-group-append ml-2"
              style={{ display: AccessLevel == Role.Student ? "" : "none" }}
            >
              {/* <div className="form-group"> */}
              {/* <div className="input-group mb-2"> */}
              <div className="input-group-prepend">
                <div className="input-group-text user-additional-info-label">
                  Class:{" "}
                </div>
              </div>
              <select
                className="input-group-prepend col-12"
                onChange={handleClassChange}
                name="ClassId"
                value={ClassId}
              >
                <option value="">--- SELECT CLASS ---</option>
                {userClasses &&
                  userClasses.length > 0 &&
                  userClasses.map((uc) => (
                    <option key={uc.classSubjectID} value={uc.classID}>
                      {uc.classDesc}
                    </option>
                  ))}
              </select>
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text user-additional-info-label">
                Allow Login?{" "}
              </div>
            </div>
            <div className="input-group-prepend p-1 mt-2 ml-2">
              <input
                type="checkbox"
                className="pt-6"
                onChange={handleAllowLoginChange}
                name="AllowLogin"
                value={AllowLogin}
                checked={AllowLogin}
              ></input>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  //===================================================
  //
  //===================================================
  const redirectUser = () => {
    if (redirectToReferer) {
      return <Redirect to="/login" />;
    }
  };

  //===================================================
  //
  //===================================================
  return (
    <div className="row d-flex register m-0 p-0">
      <div className="col-lg-1 col-sm-12">&nbsp;</div>
      <div className="col-lg-10 col-sm-12">
        {showError()}
        {showSuccess()}
        {showProcessing()}
        {userRegistrationForm()}
        {redirectUser()}
      </div>
      <div className="col-lg-1 col-sm-12">
        &nbsp;
        {/* <pre>{JSON.stringify(props, null, 4)}</pre> */}
      </div>
    </div>
  );
}

export default Register;
