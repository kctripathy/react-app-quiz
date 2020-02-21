import React, {useState} from 'react';
import {Redirect, Link} from 'react-router-dom';
import Layout from '../pages/Layout';
import {register} from '../auth';


function Register() {

    const [values, setValues] = useState({
         AccountId: 0,
         FullName: '',
         UserName: '',
         UserEmail: '',
         UserPhone: '',
         UserPassword: '',
        error: '',
        success: '',
        redirectToReferer
     })
  
     const { AccountId, FullName, UserName, UserEmail, UserPhone, UserPassword, error,success,redirectToReferer } = values;
  
     const handleOnChange = name => (e) => {
        setValues({
           ...values,
           [name]: e.target.value
        })
     };
  
  
     const handleFormSubmit = e => {
        
        e.preventDefault();          
        register({ AccountId, FullName, UserName, UserEmail, UserPhone, UserPassword })
           .then(data => {
              
               if (data===undefined) {
                  setValues({ ...values, error: 'some error occured', success: false })
               }
               else if (data.error) {
                 setValues({ ...values, error: data.error, success: false })
              }
              else if (data.status.code < 0) {
                setValues({ ...values, error: data.status.message, success: false })
             }
              else {
                // debugger;
                // setValues({
                //     ...values,
                //     redirectToReferer: "/",
                //     error: '',
                //     success: false
                //  })
                 setValues({
                    ...values,
                    FullName: '',
                    UserName: '',
                    UserEmail: '',
                    UserPhone: '',
                    UserPassword: '',
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
           New account is created. Please <Link to="/login">login</Link>.
        </div>
     );
  

     const userRegistrationForm = () => (
      <form onSubmit={handleFormSubmit}>
         <div className="card border-primary rounded-0">
                    <div className="card-header p-0">
                        <div className="bg-info text-white text-center py-2">
                            <h3><i className="fa fa-user"></i> New User Registration</h3>
                        </div>
                    </div>
                    <div className="card-body p-3">
                        
                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-user-circle text-info"></i></div>
                                </div>
                                <input type="text" className="form-control" 
                                          id="name" 
                                          name="FullName" 
                                          value={FullName} 
                                          onChange={handleOnChange('FullName')}
                                          placeholder="Enter your Full Name" required />
                                <label className="text-danger ml-2">*</label>                               
                            </div>
                        </div>

                        {/* <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-user text-info"></i></div>
                                </div>
                                <input type="text" className="form-control" 
                                          id="name" 
                                          name="UserName" 
                                          value={UserName} 
                                          onChange={handleOnChange('UserName')}
                                          placeholder="Enter your User Name (can log on with this)" />
                            </div>
                        </div> */}
                        
                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-envelope text-info"></i></div>
                                </div>
                                <input type="email" className="form-control" 
                                       id="email" 
                                       name="UserEmail" 
                                       value={UserEmail} 
                                       onChange={handleOnChange('UserEmail')}
                                       placeholder="Enter your email address  (can log on with this)" required />
                                <label className="text-danger ml-2">*</label>
                            </div>
                        </div>

                        {/* <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-phone text-info"></i></div>
                                </div>
                                <input type="number" className="form-control"
                                       id="phone" 
                                       name="UserPhone" 
                                       value={UserPhone} 
                                       onChange={handleOnChange('UserPhone')}
                                       placeholder="Enter your phone number  (can log on with this)" required />
                            </div>
                        </div> */}


                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-key text-info"></i></div>
                                </div>
                                <input type="password" className="form-control" 
                                       id="password" 
                                       name="UserPassword" 
                                       value={UserPassword} 
                                       onChange={handleOnChange('UserPassword')}
                                       placeholder="Enter your password" required />
                                <label className="text-danger ml-2">*</label>
                            </div>
                        </div>

                        <div className="text-center">
                            <input type="submit" value="Login" className="btn btn-info rounded-0 py-2" />
                        </div>
                    </div>
                                                    
                </div>             
      </form>
   );

const redirectUser = () => {
    if (redirectToReferer) {        
       return <Redirect to="/login" />
    }
 }
    return (
        <Layout>
             <div className="row">
                <div className="col-6">
                     {showError()}
                     {showSuccess()}
                    {userRegistrationForm()}
                    {redirectUser()}
                </div>
                <div className="col-6 user-register-image" >
                    
                </div>
            </div>  
            <div className="row">
            {/* {JSON.stringify(values)} */}
            </div>       
        </Layout>
    );
}

export default Register;