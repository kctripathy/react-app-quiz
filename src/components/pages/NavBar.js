import React, { Fragment, useState } from 'react';
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

    const showCustomLinks = () => {
        const user = isAuthenticated();
        if (user !== undefined) {
            if (user.accessLevel === 100) {
                return showUserLinks();
            }
            if (user.accessLevel === 1 || user.accessLevel === 10) {
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
                <ul className="navbar-nav mr-auto col-9">
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
                <ul className="navbar-nav mr-auto col-3">

                    {(!isAuthenticated()) && (
                        <Fragment>
                            <li className="nav-item  ml-2" data-toggle="collapse" data-target=".navbar-collapse.show">
                                <Link className={isActive(history, "/login")} to="/login">Login</Link>
                            </li>
                            <li className="nav-item  ml-2" data-toggle="collapse" data-target=".navbar-collapse.show">
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
                    <li className="nav-item  ml-2" data-toggle="collapse" data-target=".navbar-collapse.show">
                        <Link className={isActive(history, "/contact")} to="/contact">Contact</Link>
                    </li>
                    {(isAuthenticated()) && (
                        <li className="nav-item dropdown">
                            <Link className="nav-link nav-link-topmenu dropdown-toggle" to="/"
                                id="navbarDropdown" role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                My Profile
                                    </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/user/profile">Update My Profile</Link>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}





export default withRouter(NavBar);