import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../pages/Layout';
import { isAuthenticated } from "../auth";

function SuperAdminDashboard() {

    const [user, setUser] = useState(isAuthenticated());

    //console.log(user);
    //debugger;

    const { id, userEmail, fullname, accessLevel } = user;



    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/subjects/list">
                            Manage Class & Subjects
                        </Link>
                    </li>
                    <li className="list-group-item list-header">
                        Account Management
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/account/add">
                            Add New Account
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/account/list">
                            Manage Accounts
                        </Link>
                    </li>
                    <li className="list-group-item list-header">
                        User Management
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/user/add">
                            Add New User
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/user/list">
                            Manage Users
                        </Link>
                    </li>
                    <li className="list-group-item list-header">
                        Question Management
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/question/add">
                            Add New Question
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/questions/list">
                            Manage Questions
                        </Link>
                    </li>
                    {/* <li className="list-group-item">
                        <Link className="nav-link" to="/admin/orders">
                            View Results
                        </Link>
                    </li> */}
                </ul>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div className="card mb-5">
                <h4 className="card-header">User Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">{fullname}</li>
                    <li className="list-group-item">{userEmail}</li>
                    <li className="list-group-item">
                        {accessLevel === 1 ? "Super Admin" : accessLevel === 10 ? "Admin" : "User"}
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
                <div className="col-3">{adminLinks()}</div>
                <div className="col-9">{adminInfo()}</div>
            </div>
        </Layout>
    );
}

export default SuperAdminDashboard;