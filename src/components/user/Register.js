import React, {useState} from 'react';
import Layout from '../pages/Layout';
import {register} from '../auth';

function Register() {

    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        error: '',
        success: ''
     })
  
     const { name, email, phone, password, error,success } = values;
  
     const handleOnChange = name => (e) => {
        setValues({
           ...values,
           [name]: e.target.value
        })
     };
  
  
     const handleFormSubmit = e => {
        e.preventDefault();
        register({ name, email, phone, password })
           .then(data => {
              if (data.error) {
                 setValues({ ...values, error: data.error, success: false })
              }
              else {
                 setValues({
                    ...values,
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    error: '',
                    success: true
                 })
              }
           })
     };
  
     const showError = () =>(
        <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
           {error}
        </div>
     );
  
     const showSuccess = () =>(
        <div className="alert alert-success" style={{display: success ? '': 'none'}}>
           New account is created. Please sign in.
        </div>
     );
  
     const signUpForm = () => (
        <form onSubmit={handleFormSubmit}>
           <div className="form-group">
              {/* <label className="text-muted">Name:</label> */}
              <input onChange={handleOnChange('name')} type="text" className="form-control" value={name} required placeholder="Please enter your full name" />
           </div>
  
           <div className="form-group">
              {/* <label className="text-muted">Email:</label> */}
              <input onChange={handleOnChange('email')} type="email" className="form-control" value={email} required placeholder="Please enter your email address"/>
           </div>
  
           <div className="form-group">
              {/* <label className="text-muted">Phone:</label> */}
              <input onChange={handleOnChange('phone')} type="number" className="form-control" value={phone} required placeholder="Please enter your phone number"/>
           </div>
  
           <div className="form-group">
              {/* <label className="text-muted">Password:</label> */}
              <input onChange={handleOnChange('password')} type="password" className="form-control" value={password} required placeholder="Please enter your password"/>
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
                <div className="col-12">
                    <h4>Register New User:</h4>
                </div>
                <div className="col-6">
                    {signUpForm()}
                </div>
                <div className="col-6 user-register-image" >
                    {/* {JSON.stringify(values)} */}
                </div>
            </div>         
        </Layout>
    );
}

export default Register;