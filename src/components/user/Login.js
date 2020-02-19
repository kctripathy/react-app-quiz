import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';

import Layout from '../pages/Layout';
import { login, authenticate, isAuthenticated } from '../auth';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        loading: false,
        error: '',
        redirectToReferer: ''
     })
  
     const { email, password, error, loading, redirectToReferer } = values;
     const {user}=isAuthenticated();
  
     const handleOnChange = name => (e) => {
        setValues({
           ...values,
           [name]: e.target.value
        })
     };
  
  
     const handleFormSubmit = e => {
        e.preventDefault();
        setValues({ ...values, error: false, loading: true });
        login({ email, password })
           .then(data => {
              if (data.error) {
                 setValues({ ...values, error: data.error, loading: false })
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
           if (user && user.role === 1)
              return <Redirect to="/admin/dashboard" />
           else
           return <Redirect to="/dashboard" />
        }
     }

    const signInForm = () => (
        <form onSubmit={handleFormSubmit}>
  
           <div className="form-group">
            
              {/* <label className="text-muted">User Name:</label> */}
              <input onChange={handleOnChange('email')} type="email" className="form-control" value={email} required placeholder="Please enter your User Name or Registred Email or Phone Number" />
           </div>
  
           <div className="form-group">
              {/* <label className="text-muted">Password:</label> */}
              <input onChange={handleOnChange('password')} type="password" className="form-control" value={password} required placeholder="Please enter the password"/>
           </div>
  
           <button className="btn btn-outline-primary">Submit</button>
           {/* <p>
              {JSON.stringify(values)}
           </p> */}
        </form>
     );

     
    return (
        <Layout>
            <div className="row">
                <div className="col-12 m-20" style={{paddingTop: "20px"}}>
                    <h4>Login:</h4>
                </div>
                <div className="col-6" style={{paddingTop: "20px"}}>
                    {signInForm()}
                </div>
                <div className="col-6 user-login-image">
                    {/* {JSON.stringify(values)} */}
                </div>
            </div>                         
        </Layout>
    );
}

export default Login;