import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, logout } from "../auth";
import { Role, getRoleDescription } from "../../constants/index";
import { notNull } from "../common/CommonFunctions";
import StudentsNavMenu from "../student/StudentsNavMenu";
import TeachersNavMenu from "../teacher/TeachersNavMenu";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return "nav-link active";
  } else {
    return "nav-link inactive";
  }
};

function NavBar({ history }) {
  const { fullname, accessLevel, accountName } = isAuthenticated();

  const showCustomLinks = () => {
    if (notNull(accessLevel) && accessLevel !== 0) {
      if (accessLevel === Role.User) {
        return showUserLinks();
      } else if (accessLevel === Role.Student) {
        return <StudentsNavMenu />;
      } else if (accessLevel === Role.Teacher) {
        return <TeachersNavMenu />;
      } else if (accessLevel === Role.Admin) {
        return showAdminLinks();
      } else if (accessLevel === Role.SuperAdmin) {
        return showSuperAdminLinks();
      }
    }
  };

  const showUserLinks = () => {
    return (
      <Fragment>
        <li className="nav-item">
          <Link className={isActive(history, "/quiz")} to="/quiz">
            Quiz
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={isActive(history, "/user/dashboard")}
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        </li>
      </Fragment>
    );
  };

  const showAdminLinks = () => {
    return (
      <Fragment>
        <li className="nav-item">
          <Link className={isActive(history, "/quiz")} to="/quiz">
            Quiz
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={isActive(history, "/admin/dashboard")}
            to="/admin/dashboard"
          >
            Dashboard
          </Link>
        </li>
      </Fragment>
    );
  };

  const showSuperAdminLinks = () => {
    return (
      <Fragment>
        <li className="nav-item">
          <Link
            className={`nav-link ${isActive(history, "/superAdmin/dashboard")}`}
            to="/superAdmin/dashboard"
          >
            &nbsp;&nbsp;Dashboard
          </Link>
        </li>
      </Fragment>
    );
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
      <Link className="navbar-brand" to="/">
        &nbsp;
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto col-8">
          <li className="nav-item">
            <Link to="/">
              <span className="sr-only">(current)</span>
            </Link>
          </li>

          <li
            className="nav-item ml-2"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
          >
            <Link className={isActive(history, "/home")} to="/home">
              Home
            </Link>
          </li>
          <li
            className="nav-item  ml-2"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
          >
            <Link className={isActive(history, "/about")} to="/about">
              About
            </Link>
          </li>
          {showCustomLinks()}
        </ul>
        <ul className="navbar-nav ml-auto navbar-right">
          {!isAuthenticated() && (
            <Fragment>
              <li
                className="nav-item  m-0 ml-2"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <Link className={isActive(history, "/login")} to="/login">
                  Login
                </Link>
              </li>
              <li
                className="nav-item m-0 ml-2"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <Link className={isActive(history, "/register")} to="/register">
                  Register
                </Link>
              </li>
            </Fragment>
          )}

          <li
            className="nav-item  m-0 ml-2"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
          >
            <Link className={isActive(history, "/contact")} to="/contact">
              <i className="fa fa-envelope"></i>
            </Link>
          </li>
          {isAuthenticated() && (
            <li className="nav-item dropdown dropleft">
              <Link
                className="nav-link active nav-link-topmenu dropdown-toggle text-center"
                to="/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {fullname && fullname.length > 35
                  ? fullname.toUpperCase().substring(0, 34) + "..."
                  : fullname}
              </Link>
              <div className="account-name">
                <small>Powered By:</small> <br />
                <b>{accountName}</b>
              </div>
              <div
                className="dropdown-menu dropdown-menu-items"
                aria-labelledby="navbarDropdown"
              >
                <Link
                  className="dropdown-item"
                  to={`/${getRoleDescription(accessLevel)}/dashboard`}
                >
                  Dashboard
                </Link>
                <Link
                  className="dropdown-item"
                  to={`/${getRoleDescription(accessLevel)}/profile`}
                >
                  My Profile
                </Link>

                {accessLevel === Role.SuperAdmin && (
                  <Fragment>
                    <hr />
                    <Link className="dropdown-item" to="/account/list">
                      Manage Accounts
                    </Link>
                    <Link className="dropdown-item" to="/user/list">
                      Manage Users
                    </Link>
                    <Link className="dropdown-item" to="/question/list">
                      Manage Questions
                    </Link>
                    <hr />
                  </Fragment>
                )}
                {accessLevel === Role.Admin && (
                  <Fragment>
                    <hr />
                    <Link className="dropdown-item" to="/user/list">
                      Manage Users
                    </Link>
                    <Link className="dropdown-item" to="/question/list">
                      Manage Questions
                    </Link>
                    <hr />
                  </Fragment>
                )}
                {accessLevel === Role.User && false && (
                  <Fragment>
                    <hr />
                    <Link className="dropdown-item" to="/quiz">
                      Quiz Questions
                    </Link>
                    <Link className="dropdown-item" to="/user/result">
                      Quiz Results
                    </Link>
                    <hr />
                  </Fragment>
                )}
                {/* <Link className="dropdown-item" to="/user/change-password">
                  Change Password
                </Link> */}

                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={() =>
                    logout(() => {
                      history.push("/");
                    })
                  }
                >
                  Logout
                </Link>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(NavBar);
