import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../pages/Layout';
import { isAuthenticated } from "../auth";

function UserDashboard() {

    const [user, setUser] = useState(isAuthenticated());

    const { id, userEmail, fullname, accessLevel } = user;



    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/user/profile">
                            My Profile
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/quiz">
                            Quiz
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/user/quiz/results">
                            View Results
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/user/change-password">
                            Change Password
                        </Link>
                    </li>

                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h4 className="card-header">User Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">{fullname}</li>
                    <li className="list-group-item">{userEmail}</li>
                    <li className="list-group-item">
                        {accessLevel === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout>
            <div className="row">
                <div className="col-12">
                    <h4>&nbsp;</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-3">{userLinks()}</div>
                <div className="col-9">{userInfo()}</div>
            </div>
        </Layout>
    );
}

export default UserDashboard;