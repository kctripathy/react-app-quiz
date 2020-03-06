import React, { useState, Fragment, useEffect, useCallback } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Layout from '../pages/Layout';
import { register, isAuthenticated } from '../auth';

import { getAllClassSubjectsByAccountId, removeDuplicates } from '../admin/index';

function Register(props) {

    const [values, setValues] = useState({
        AccountId: 0,
        FullName: 'hari',
        UserName: '',
        UserEmail: 'haribolo@gmail.com',
        UserPhone: '999988888',
        UserPassword: 'abcd',
        ClassId: 4,
        SubjectIds: [1, 2, 3, 4],
        AccessLevel: 100,
        error: '',
        success: '',
        redirectToReferer
    })
    const [userClasses, setUserClasses] = useState([]);
    //const [classSubjects, setClassSubjects] = useState([]);
    //const [subjects, setSubjects] = useState([]);


    const { AccountId,
        FullName, UserName, UserEmail,
        UserPhone, UserPassword, ClassId, SubjectIds,
        AccessLevel, error, success, redirectToReferer } = values;

    useEffect(() => {

        const user = isAuthenticated();

        getAllClassSubjectsByAccountId(user.accountId)
            .then(data1 => {
                if (data1 !== undefined) {
                    //debugger;
                    //console.log(data1);
                    //if (data1.status.code !== undefined && data1.status.code === "1") {
                    const allClasses = removeDuplicates(data1.result, "classID");
                    setUserClasses(allClasses);

                    //alert(data1);
                    //setClassSubjects(data1.result);
                    // setValues({
                    //     ...values,
                    //     accountId: user.accountId,
                    //     isLoading: false,
                    //     error: ''
                    // })
                    //}
                }
            })

        if (props.mode === 'edit') {

            setValues({
                ...values,
                accountId: props.user[0].accountId,
                FullName: props.user[0].fullname,
                UserEmail: props.user[0].userEmail,
                UserPhone: props.user[0].userPhone,
                AccessLevel: props.user[0].accessLevel,
                ClassId: props.user[0].classId,
                isLoading: false,
                error: ''
            })
        }
    }, []);

    const handleOnChange = name => (e) => {
        setValues({
            ...values,
            [name]: e.target.value
        })
    };

    const handleClassChange = e => {
        //e.preventDefault();
        setValues({
            ...values,
            ClassId: parseInt(e.target.value)
        })
    }

    const handleAccessLevelChange = e => {
        //e.preventDefault();
        setValues({
            ...values,
            AccessLevel: parseInt(e.target.value)
        })
    }

    const handleFormSubmit = e => {

        e.preventDefault();

        if (props.mode === 'edit') {
            alert('updated....');
            return;
        }
        register({ AccountId, FullName, UserName, UserEmail, UserPhone, UserPassword, ClassId, AccessLevel })
            .then(data => {

                if (data === undefined) {
                    setValues({ ...values, error: 'some error occured', success: false })
                }
                else if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else if (data.status.code < 0) {
                    setValues({ ...values, error: data.status.message, success: false })
                }
                else {
                    setValues({
                        ...values,
                        FullName: '',
                        UserName: '',
                        UserEmail: '',
                        UserPhone: '',
                        UserPassword: '',
                        classId: 0,
                        subjectIds: [],
                        error: '',
                        success: true
                    })
                }
            })
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/login">login</Link>.
        </div>
    );


    //This section will be shown to everyone for registering an account
    const userRegistrationForm = () => (
        <form onSubmit={handleFormSubmit}>
            <div className="card border-dark rounded-0">
                <div className="card-header p-0">
                    <div className="bg-card-header text-dark text-center py-2">
                        <h5>
                            {/* <i className="fa fa-user ml-10"></i>&nbsp; */}
                            {props.isAdmin === 'yes' ? props.mode === 'edit' ? "Edit User" : "Add New User" : "New User Registration"}
                            {/* <i className="fa fa-user mr-10"></i> */}
                        </h5>

                        {/* isAdmin: {props.isAdmin} */}
                    </div>
                </div>
                <div className="card-body p-3">

                    <div className="form-group">
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text user-additional-info-label">Name:<i className="fa fa-user-circle text-info"></i></div>
                            </div>
                            <input type="text" className="form-control"
                                id="name"
                                name="FullName"
                                value={FullName}
                                onChange={handleOnChange('FullName')}
                                placeholder="Enter Full Name" required />
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
                                <div className="input-group-text user-additional-info-label">Email:<i className="fa fa-envelope text-info"></i></div>
                            </div>
                            <input type="email" className="form-control"
                                id="email"
                                name="UserEmail"
                                value={UserEmail}
                                onChange={handleOnChange('UserEmail')}
                                placeholder="Enter email address  (can log on with this)" required />
                            <label className="text-danger ml-2">*</label>
                        </div>
                    </div>


                    <div className="form-group">
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text user-additional-info-label">Password<i className="fa fa-key text-info"></i></div>
                            </div>
                            <input type="password" className="form-control"
                                id="password"
                                name="UserPassword"
                                value={UserPassword}
                                onChange={handleOnChange('UserPassword')}
                                placeholder="Enter password" required />
                            <label className="text-danger ml-2">*</label>
                        </div>
                    </div>
                    {props.isAdmin === 'yes' ? newUserAdditionalInformation() : ''}
                    <div className="text-center">
                        <input type="submit" value={props.isAdmin ? props.mode === 'edit' ? 'Update User' : 'Save User' : 'Register'}
                            className="btn btn-info btn-block rounded-0 py-2" />
                    </div>
                </div>

            </div>
        </form>
    );

    //This section will only be shown to admin while creating a new user
    const newUserAdditionalInformation = () => {
        return (
            <Fragment>
                <div className="form-group">
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text user-additional-info-label">Phone: <i className="fa fa-phone text-info"></i></div>
                        </div>
                        <input type="number" className="form-control"
                            id="phone"
                            name="UserPhone"
                            value={UserPhone}
                            onChange={handleOnChange('UserPhone')}
                            placeholder="Enter phone number" required />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text user-additional-info-label">Class: </div>
                        </div>
                        <select className="input-group-prepend"
                            onChange={handleClassChange}
                            name="ClassId"
                            value={ClassId}
                            required>
                            <option value="">--Select User's Class--</option>
                            {
                                userClasses && userClasses.length > 0 && userClasses.map((uc) => <option key={uc.classSubjectID} value={uc.classID}>{uc.classDesc}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text user-additional-info-label">Role: </div>
                        </div>
                        <select className="input-group-prepend"
                            onChange={handleAccessLevelChange}
                            name="AccessLevel"
                            value={AccessLevel}>
                            <option value="100">User</option>
                            <option value="10">Administrator</option>
                        </select>
                    </div>
                </div>

            </Fragment>
        )
    };

    const redirectUser = () => {
        if (redirectToReferer) {
            return <Redirect to="/login" />
        }
    };

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
                {/* {JSON.stringify(userClasses)} */}


            </div>
        </Layout>
    );
}

export default Register;