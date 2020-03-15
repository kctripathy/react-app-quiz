import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, logout, isSuperAdmin } from '../auth';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return ("nav-link active")
    }
    else {
        return ("nav-link inactive")
    }
}

function NavBar({ history }) {

    const { fullname, accessLevel, accountName } = isAuthenticated();

    //debugger;
    const showCustomLinks = () => {
        //const user = isAuthenticated();
        //debugger;
        if (accessLevel !== undefined && accessLevel !== 0) {
            if (accessLevel === 100) {
                return showUserLinks();
            }
            if (accessLevel === 1 || accessLevel === 10) {
                return showAdminLinks();
            }
        }
    }

    const showUserLinks = () => {
        return (
            <Fragment>
                <li className="nav-item">
                    <Link className={isActive(history, "/quiz")} to="/quiz">Quiz</Link>
                </li>
                <li className="nav-item">
                    <Link className={isActive(history, "/user/dashboard")} to="/user/dashboard">Dashboard</Link>
                </li>
            </Fragment>
        )
    }

    const showAdminLinks = () => {
        return (
            <Fragment>
                <li className="nav-item">
                    <Link className={isActive(history, "/quiz")} to="/quiz">Quiz</Link>
                </li>
                <li className="nav-item">
                    {isSuperAdmin() ?
                        (<Link className={isActive(history, "/superAdmin/dashboard")} to="/superAdmin/dashboard">Dashboard</Link>)
                        :
                        (<Link className={isActive(history, "/admin/dashboard")} to="/admin/dashboard">Dashboard</Link>)
                    }
                </li>
            </Fragment>
        )
    }
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
            <Link className="navbar-brand" to="/">&nbsp;</Link>
            <button className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto col-8">
                    <li className="nav-item">
                        <Link to="/"><span className="sr-only">(current)</span></Link>
                    </li>

                    <li className="nav-item ml-2" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <Link className={isActive(history, "/home")} to="/home">Home</Link>
                    </li>
                    <li className="nav-item  ml-2" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <Link className={isActive(history, "/about")} to="/about">About</Link>
                    </li>
                    {/* <li className="nav-item">
                            <Link className={isActive(history, "/quiz")} to="/quiz">Quiz</Link>
                        </li>  */}
                    {showCustomLinks()}
                </ul>
                <ul className="navbar-nav ml-auto navbar-right">

                    {(!isAuthenticated()) && (
                        <Fragment>
                            <li className="nav-item  m-0" data-toggle="collapse" data-target=".navbar-collapse.show">
                                <Link className={isActive(history, "/login")} to="/login">Login</Link>
                            </li>
                            <li className="nav-item  m-0" data-toggle="collapse" data-target=".navbar-collapse.show">
                                <Link className={isActive(history, "/register")} to="/register">Register</Link>
                            </li>
                        </Fragment>
                    )}
                    {(isAuthenticated()) && (
                        <li className="nav-item">
                            <Link className={isActive(history, "/logout")} to="#"
                                onClick={() => logout(() => {
                                    history.push("/")
                                })}>Logout</Link>
                        </li>
                    )}
                    <li className="nav-item  m-0" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <Link className={isActive(history, "/contact")} to="/contact">Contact</Link>
                    </li>
                    {(isAuthenticated()) && (
                        <li className="nav-item dropdown">
                            {/* <div className="row">
                                <div className="col-12 text-center">
                                    <b><u>{accountName}</u></b>
                                </div>
                            </div> */}
                            <Link className="nav-link active nav-link-topmenu dropdown-toggle text-center"
                                to="/"
                                id="navbarDropdown" role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                {fullname.length > 35 ? fullname.toUpperCase().substring(0, 34) + "..." : fullname.toUpperCase()}
                            </Link>
                            <div className="account-name"><small>Powered By:</small> <br /><b>{accountName}</b></div>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/user/profile">My Profile</Link>
                                {accessLevel === 1 &&
                                    <Fragment>
                                        <hr />
                                        <Link className="dropdown-item" to="/quiz">Manage Accounts</Link>
                                        <Link className="dropdown-item" to="/quiz">Manage Users</Link>
                                        <Link className="dropdown-item" to="/quiz">Manage Questions</Link>
                                        <hr />
                                    </Fragment>
                                }
                                {accessLevel === 10 &&
                                    <Fragment>
                                        <hr />
                                        <Link className="dropdown-item" to="/quiz">Manage Users</Link>
                                        <Link className="dropdown-item" to="/quiz">Manage Questions</Link>
                                        <hr />
                                    </Fragment>
                                }
                                {accessLevel === 100 && false &&
                                    <Fragment>
                                        <hr />
                                        <Link className="dropdown-item" to="/quiz">Quiz Questions</Link>
                                        <Link className="dropdown-item" to="/user/result">Quiz Results</Link>
                                        <hr />
                                    </Fragment>
                                }
                                <Link className="dropdown-item" to="/user/change-password">Change Password</Link>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}





export default withRouter(NavBar);