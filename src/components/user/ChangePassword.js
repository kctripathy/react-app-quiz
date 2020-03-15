import React, { useState } from 'react';
import Layout from '../pages/Layout';

const ChangePassword = () => {
    const [UserPasswordCurrent, setUserPasswordCurrent] = useState('');
    const [UserPasswordNew1, setUserPasswordNew1] = useState('');
    const [UserPasswordNew2, setUserPasswordNew2] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('')

    const hangleSubmitChangePassword = (e) => {
        e.preventDefault();
        setSuccess('Password changed successfully');
    };

    const showError = () => (
        <div className="alert alert-danger text-center" style={{ display: error.length > 0 ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success text-center" style={{ display: success.length > 0 ? '' : 'none' }}>
            {success}
        </div>
    );

    return (
        <Layout title="Change Pasword">

            <div id="forgot-password">
                <form onSubmit={hangleSubmitChangePassword}>
                    <label>Current Password:</label>
                    <input type="password"
                        className="form-control"
                        id="email"
                        name="UserPasswordCurrent"
                        value={UserPasswordCurrent}
                        onChange={(e) => setUserPasswordCurrent(e.target.value)}
                        placeholder="Enter your current password"
                        required />

                    <label>New Password:</label>
                    <input type="password"
                        className="form-control"
                        id="email"
                        name="UserPasswordNew1"
                        value={UserPasswordNew1}
                        onChange={(e) => setUserPasswordNew1(e.target.value)}
                        placeholder="Enter your new password"
                        required />

                    <label>Re-enter New Password:</label>
                    <input type="password"
                        className="form-control"
                        id="email"
                        name="UserPasswordNew2"
                        value={UserPasswordNew2}
                        onChange={(e) => setUserPasswordNew2(e.target.value)}
                        placeholder="Re-enter your password"
                        required />

                    <button
                        type="submit"
                        className="btn btn-info btn-block rounded-0 py-2 mt-2">CHANGE PASSWORD</button>
                </form>

                <div className="row mt-4">
                    <div className="col-12">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ChangePassword;