import React, { useState, useEffect } from 'react';
import { resetUserPassword } from '../admin'
import Layout from '../pages/Layout';

const ResetPassword = ({ match }) => {
    //const [User, setUser] = useState({});
    const [UserPasswordNew1, setUserPasswordNew1] = useState('bbbb');
    const [UserPasswordNew2, setUserPasswordNew2] = useState('bbbb');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('')

    useEffect(() => {
        //console.log(match);
        //console.log('authKey:', match.params.authKey);

    }, []);

    const hangleSubmitResetPassword = (e) => {
        e.preventDefault();

        if (UserPasswordNew1 !== UserPasswordNew2) {
            setError('Password and confirm password mismatch');
            setSuccess('');
            return;
        }
        const authKey = match.params.authKey;
        resetUserPassword({ AccessToken: authKey, UserPassword: UserPasswordNew1 })
            .then(data => {
                setSuccess('Password changed successfully');
                setError('');
            })
            .catch(err => {
                setSuccess('');
                setError('Failed to reset password');
            })
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
        <Layout title="Reset Pasword">

            <div id="forgot-password">
                <form onSubmit={hangleSubmitResetPassword}>
                    {/* <label>Current Password:</label>
                    <input type="password"
                        className="form-control"
                        id="email"
                        name="UserPasswordCurrent"
                        value={UserPasswordCurrent}
                        onChange={(e) => setUserPasswordCurrent(e.target.value)}
                        placeholder="Enter your current password"
                        required /> */}

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
                        className="btn btn-info btn-block rounded-0 py-2 mt-2">RESET PASSWORD</button>
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

export default ResetPassword;