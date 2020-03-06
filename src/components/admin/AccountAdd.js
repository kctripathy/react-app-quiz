import React, { useEffect, useReducer, useState } from 'react'
import Layout from '../pages/Layout';
import SelectClasses from '../common/SelectClasses';

import classSubjectReducer, { initialState } from '../../reducers/classSubject';
import { getAllClassSubjectsByAccountId, addNewAccount } from '../admin/index';

function AccountAdd() {
    const [state, dispatch] = useReducer(classSubjectReducer, initialState);
    const [checkedItems, setCheckedItems] = useState([])
    const [account, setAccount] = useState({
        accountName: 'aa',
        contactName: 'bb',
        contactPhone: '1111122222',
        contactEmail: 'newAc@gmail.com',
        loginPassword: 'aaaa',
        classSubjects: [],
        success: '',
        error: '',
        run: false
    });

    const { accountName, contactName, contactPhone, contactEmail, loginPassword } = account;


    // ==========================================================
    // Load all class and subjects
    // ==========================================================
    useEffect(() => {
        dispatch({ type: 'fetchingApi' });
        getAllClassSubjectsByAccountId(0)
            .then(data => {

                if (data !== undefined) {
                    if (data.status.code === "1") {
                        dispatch({ type: 'fetchApiSuccess', payload: data.result });
                    }
                    else {
                        dispatch({ type: 'fetchApiError', payload: 'Some error occured!' });
                    }
                }
                else {
                    dispatch({ type: 'fetchApiError', payload: 'Some error occured!' });
                }
            })
            .catch(err => {
                dispatch({ type: 'fetchApiError', payload: err });
            })
    }, [account.run])


    // ==========================================================
    // Show account holders entry form
    // ==========================================================
    const showAccountAddForm = () => (
        <div className="card border-text-info rounded-10">
            <div className="card-header p-0">
                <div className="bg-muted text-dark text-center py-2">
                    <h5>Account Details</h5>
                </div>
            </div>
            <div className="card-body p-3">
                <div className="form-group">
                    <div className="input-group mb-0">
                        <input type="text" className="form-control"
                            id="AccountName"
                            name="accountName"
                            value={accountName}
                            onChange={handleTextBoxChange}
                            placeholder="Account Name (Enter account holder's institution/organisation name)" required />
                        <label className="text-danger ml-2">*</label>
                    </div>
                </div>

                <div className="form-group">
                    <div className="input-group mb-0">
                        <input type="text" className="form-control"
                            id="ContactName"
                            name="contactName"
                            value={contactName}
                            onChange={handleTextBoxChange}
                            placeholder="ontact Name" required />
                        <label className="text-danger ml-2">*</label>
                    </div>
                </div>

                <div className="form-group">
                    <div className="input-group mb-0">
                        <input type="number" className="form-control"
                            id="ContactPhone"
                            name="contactPhone"
                            value={contactPhone}
                            onChange={handleTextBoxChange}
                            placeholder="Phone Number" required />
                        <label className="text-danger ml-2">*</label>
                    </div>
                </div>

                <div className="bg-muted text-dark text-left py-2">
                    <b>Login Credentials:</b>
                </div>

                <div className="form-group">
                    <div className="input-group mb-0">
                        <input type="email" className="form-control"
                            id="ContactEmail"
                            name="contactEmail"
                            value={contactEmail}
                            onChange={handleTextBoxChange}
                            placeholder="Email Address (Account holder's login name)" required />
                        <label className="text-danger ml-2">*</label>
                    </div>
                </div>

                <div className="form-group">
                    <div className="input-group mb-0">
                        <input type="password" className="form-control"
                            id="LoginPassword"
                            name="loginPassword"
                            value={loginPassword}
                            onChange={handleTextBoxChange}
                            placeholder="Password (Account holder's login password)" required />
                        <label className="text-danger ml-2">*</label>
                    </div>
                </div>

                <div className="text-center">
                    <input type="submit"
                        value="CREATE NEW ACCOUNT"
                        className="btn btn-info btn-block rounded-0 py-2" />
                </div>
            </div>
        </div>
    );


    // ==========================================================
    // Show the class and subjects for the account holder
    // ==========================================================
    const showAccountAddFormClassSubjects = () => {

        return <div className="card border-text-muted rounded-10">
            <div className="card-header p-0">
                <div className="bg-text-muted text-dark text-center py-2 p-2">
                    <h5>Class and Subjects for the Account</h5>
                    <SelectClasses onClassChange={(v) => handleClassOnChange(v)} classSubjects={state.classSubjects} />
                </div>

            </div>
            <div className="card-body p-3">
                <ul id="accountClassSubjectUL">
                    {account && account.classSubjects.map((cs) => {
                        return (
                            <li key={cs.classSubjectID}>
                                <div className="row">
                                    <div className="col-1">
                                        <input type="checkbox"
                                            name="classSubjectCheckBox"
                                            value={cs.classSubjectID}
                                            //checked={checkedItems && checkedItems.length > 0}
                                            onChange={handleCheckBoxChange}></input>
                                    </div>
                                    <div className="col-5 text-left">
                                        {cs.classDesc}
                                    </div>
                                    <div className="col-4 text-left">
                                        {cs.subjectDesc}
                                    </div>
                                </div>
                            </li>
                        )
                    })
                    }
                </ul>
            </div>
        </div>
    };

    // ==========================================================
    //  SUBMIT THE FOR TO CREATE A NEW ACCOUNT AND CLEAR ALL VARS
    // ==========================================================
    const handleSubmitAccountForm = (e) => {
        e.preventDefault();
        if (checkedItems.length === 0) {
            alert('Please choose at least one class and subject');
            return;
        }
        else {
            debugger;
            const newAccount = {
                ...account,
                classSubjects: checkedItems.join(",")
            };

            addNewAccount(newAccount)
                .then(data => {
                    //debugger;

                    if (data !== undefined && data.status.code && data.status.code === "1") {
                        setAccount({
                            ...account,
                            accountName: '',
                            contactName: '',
                            contactPhone: '',
                            contactEmail: '',
                            loginPassword: '',
                            classSubjects: [],
                            success: 'account added successfully',
                            error: '',
                            run: !account.run
                        });
                        setCheckedItems([]);
                    }
                    else {
                        setAccount({
                            ...account,
                            success: '',
                            error: 'failed to add an account'
                        })
                    }
                })
                .catch(err => {
                    setAccount({
                        ...account,
                        success: '',
                        error: 'failed to add an account ' + err
                    })
                })
        }

    };

    // ==========================================================
    // Handle the array when check or uncheck the class subjects
    // ==========================================================
    const handleCheckBoxChange = (e) => {
        if (e.target.checked === true) {
            setCheckedItems([...checkedItems, Number(e.target.value)])
        }
        else {
            setCheckedItems(checkedItems.filter((id) => id !== Number(e.target.value)));
        }
    };

    // ==========================================================
    // Handle the text box input values;
    // ==========================================================
    const handleTextBoxChange = e => {
        //console.log(e.target);
        setAccount({
            ...account,
            [e.target.name]: e.target.value
        })
    };

    // ==========================================================
    // This comes from child component
    // ==========================================================

    const handleClassOnChange = selectedOptions => {

        if (selectedOptions == null) {
            setAccount({
                ...account,
                classSubjects: []
            });
            return;
        }

        var filteredClassAndSubjects = state.classSubjects.filter(
            function (e) {
                console.log(e.classID);
                return this.indexOf(e.classID) >= 0;
            },
            selectedOptions.map((v) => v.value)
        );
        //console.log('filtered', filtered);

        setAccount({
            ...account,
            classSubjects: filteredClassAndSubjects
        })
    }

    // ==========================================================
    // Error message
    // ==========================================================
    const showErrorMessage = () => (
        account.error.length > 0 && <div className="alert alert-danger  text-center">{account.error}</div>
    );

    // ==========================================================
    // Success message
    // ==========================================================
    const showSuccessMessage = () => (
        account.success.length > 0 && <div className="alert alert-success text-center">{account.success}</div>
    );
    // ==========================================================
    return (
        <Layout title="Add new account">
            <form onSubmit={handleSubmitAccountForm}>
                <div className="row">
                    <div className="col-6">
                        {showAccountAddForm()}
                        {showErrorMessage()}
                        {showSuccessMessage()}
                    </div>
                    <div className="col-6">
                        {showAccountAddFormClassSubjects()}
                    </div>
                </div>
            </form>
        </Layout >
    )
    // ==========================================================
};

export default AccountAdd;