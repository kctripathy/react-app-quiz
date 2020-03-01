import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Layout from '../pages/Layout';
import { login, authenticate, isAuthenticated } from '../auth';

function Login() {
    const [values, setValues] = useState({
        AccountId: 0,
        UserName: '',
        UserEmail: 'haribolo@gmail.com',
        UserPassword: 'abcd',
        UserPhone: '',
        loading: false,
        error: '',
        redirectToReferer: ''
    })

    const { AccountId, UserName, UserEmail, UserPassword, UserPhone, error, loading, redirectToReferer } = values;
    const user = isAuthenticated();

    const handleOnChange = name => (e) => {
        setValues({
            ...values,
            [name]: e.target.value
        })
    };


    const handleFormSubmit = e => {
        e.preventDefault();
        setValues({ ...values, error: false, loading: true });
        login({ AccountId, UserName, UserEmail, UserPhone, UserPassword })
            .then(data => {
                if (data === undefined) {
                    setValues({ ...values, error: 'Some error occured!', loading: false })
                }
                else if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                }
                else {
                    //console.log("data:",data);                
                    if (data.status.code < 0) {
                        setValues({ ...values, error: data.status.message, loading: false })
                    }
                    else {
                        authenticate(data, () => {
                            setValues({
                                ...values,
                                redirectToReferer: "/",
                                error: '',
                                loading: false
                            })
                        })
                    }

                }
            })
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoading = () => (
        <div className="alert alert-info" style={{ display: loading ? '' : 'none' }}>
            Loading....
        </div>
    );

    const redirectUser = () => {
        if (redirectToReferer) {
            if (user && user.accessLevel === 1)
                return <Redirect to="/admin/dashboard" />
            else
                return <Redirect to="/user/dashboard" />
        }
    }


    const loginForm = () => (
        <form onSubmit={handleFormSubmit}>
            <div className="card border-primary rounded-0">
                <div className="card-header p-0">
                    <div className="bg-info text-white text-center py-2">
                        <h3><i className="fa fa-envelope"></i> Login</h3>
                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="form-group">
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text"><i className="fa fa-user text-info"></i></div>
                            </div>
                            <input type="email" className="form-control"
                                id="UserEmail"
                                name="UserEmail"
                                value={UserEmail}
                                onChange={handleOnChange('UserEmail')}
                                placeholder="Enter your user name or email or phone" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text"><i className="fa fa-key text-info"></i></div>
                            </div>
                            <input type="password" className="form-control"
                                id="UserPassword"
                                name="UserPassword"
                                value={UserPassword}
                                onChange={handleOnChange('UserPassword')}
                                placeholder="Enter your password" required />
                        </div>
                    </div>

                    <div className="text-center">
                        <input type="submit" value="Login" className="btn btn-info rounded-0 py-2" />
                    </div>
                </div>

            </div>
        </form>
    );
    return (
        <Layout>
            <div className="row">
                <div className="col-lg-6 col-md-12" style={{ paddingTop: "50px" }}>
                    {showError()}
                    {showLoading()}
                    {loginForm()}
                    {redirectUser()}
                </div>
                <div className="col-lg-6 col-md-12 user-login-image">
                    {/* {JSON.stringify(values)} */}

                </div>
            </div>
        </Layout>
    );
}

export default Login;