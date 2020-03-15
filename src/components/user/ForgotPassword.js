import React, { useState } from 'react';
import Layout from '../pages/Layout';

const ForgotPasword = () => {
    const [UserEmail, setUserEmail] = useState('kctripathy@gmail.com');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('')

    const hangleSubmitForgotPassword = (e) => {
        e.preventDefault();
        setSuccess(`Mail has been sent`);
        alert('mail sent!? work on progress');
    };

    const showError = () => (
        <div className="alert alert-danger text-center" style={{ display: error.length > 0 ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success text-center" style={{ display: success.length > 0 ? '' : 'none' }}>
            {success} to your reigstred email address <b>{UserEmail}</b><br />
            Please check your email and visit the link to change your password
        </div>
    );

    return (
        <Layout title="Forgot Pasword">

            <div id="forgot-password">
                <form onSubmit={hangleSubmitForgotPassword}>
                    <label>Login Email ID:</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        name="UserEmail"
                        value={UserEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Enter your registred email address (LoginID) to receive your password"
                        required />

                    <button
                        type="submit"
                        className="btn btn-info btn-block rounded-0 py-2 mt-2">SEND MY PASSWORD</button>
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

export default ForgotPasword;