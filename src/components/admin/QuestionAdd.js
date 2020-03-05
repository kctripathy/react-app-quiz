import React, { useState, useEffect } from 'react';

import { isAuthenticated } from '../auth/index';

import {
    addQuestion,
    getAllClassSubjectsByAccountId,
    removeDuplicates,
    getSubjectsByClassID
} from './index';

import Layout from '../pages/Layout';

function QuestionAdd() {

    const [values, setValues] = useState({
        id: 0,
        questionTypeId: 1, // Multiple type questions
        classSubjectId: 0,
        accountId: 0,
        questionName: '',
        options: [
            { id: 1, questionId: 0, optionName: '', isAnswer: false },
            { id: 2, questionId: 0, optionName: '', isAnswer: false },
            { id: 3, questionId: 0, optionName: '', isAnswer: false },
            { id: 4, questionId: 0, optionName: '', isAnswer: false }
        ],
        questionType: { id: 0, name: "Multiple Type" },
        error: '',
        success: ''
    });

    const [classSubjects, setClassSubjects] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const { questionName } = values;


    useEffect(() => {
        //Set the AccountId for the user
        const user = isAuthenticated();
        setValues({
            ...values,
            accountId: user.accountId
        })

        // Load all classes after getting all class subjects for the account id
        getAllClassSubjectsByAccountId(user.accountId)
            .then(data => {
                if (data !== undefined && data.status.code > 0) {
                    setClassSubjects(data.result);
                }
            })
    }, [])


    //================================================
    // Get the classes dropdown options
    //================================================
    const populateClassesDropDown = (arrSource) => {
        return (
            <select name="ddlClass" onChange={handleClassOnChange} required>
                <option value="">--Select Class --</option>
                {arrSource.map(c => {
                    return <option key={c.classSubjectID} value={c.classID}>{c.classDesc}</option>
                })
                }
            </select>
        )
    }

    //================================================
    const populateSubjects = () => {
        return (
            <select name="ddlSubject" onChange={handleSubjectOnChange} required>
                <option value="">--Select Subject --</option>
                {subjects.map(c => {
                    return <option key={c.classSubjectID} value={c.classSubjectID}>{c.subjectDesc}</option>
                })
                }
            </select>
        )
    }

    //================================================
    const populateClasses = () => {
        const uniqueClasses = removeDuplicates(classSubjects, 'classID');
        const classesList = populateClassesDropDown(uniqueClasses)
        return classesList;
    }

    //================================================
    const handleOnChange = (name, optionIndex) => (e) => {
        if (name === 'option') {
            const options = [...values.options];
            options[optionIndex].optionName = e.target.value;
            setValues({
                ...values,
                options
            })
        }
        else {
            setValues({
                ...values,
                [name]: e.target.value
            })
        }

    };

    //================================================
    const handleIsAnswer = (optionIndex) => (e) => {
        console.log(optionIndex);
        const options = [...values.options];
        for (let i = 0; i < 4; i++) {
            options[i].isAnswer = (optionIndex === i);
        }
        //console.log(options);

        setValues({
            ...values,
            options
        })

    }


    //================================================    
    const handleClassOnChange = (e) => {
        //debugger;
        e.preventDefault();
        //console.log("class id", e.target.value);
        setValues({
            ...values,
            classSubjectId: 0
        })
        const subjectsForTheClass = getSubjectsByClassID(classSubjects, e.target.value);
        setSubjects(subjectsForTheClass);
    }

    //================================================    
    const handleSubjectOnChange = (e) => {
        e.preventDefault();
        console.log("class subject id:", e.target.value);
        setValues({
            ...values,
            classSubjectId: Number(e.target.value)
        })
    }

    //================================================
    const validateForm = () => {
        let returnValue = false;
        let errorMessage = '';
        // check at least one answer is selected
        //debugger;
        const options = [...values.options];
        //const isChecked = options.some(c => c.isAnswer == true);

        for (let i = 0; i < 4; i++) {
            returnValue = (options[i].isAnswer === true)
            if (returnValue) break;
        }
        if (!returnValue) errorMessage = 'Please select at least one answer';

        setValues({
            ...values,
            error: errorMessage,
            success: returnValue
        })

        return returnValue;
    }

    //=================================================
    const resetValuesAfterSuccess = (message) => {
        setValues({
            ...values,
            questionName: '',
            options: [
                { id: 1, questionId: 0, optionName: '', isAnswer: false },
                { id: 2, questionId: 0, optionName: '', isAnswer: false },
                { id: 3, questionId: 0, optionName: '', isAnswer: false },
                { id: 4, questionId: 0, optionName: '', isAnswer: false }
            ],
            error: '',
            success: message
        })
    }

    const resetValuesAfterError = (message) => {
        setValues({
            ...values,
            error: message,
            success: ''
        })
    }
    //================================================
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm() === true) {
            //alert("submitted");
            addQuestion(values)
                .then(data => {
                    console.log(data);
                    if (data !== undefined && data.status.code > 0) {
                        resetValuesAfterSuccess(data.result);
                    }
                    else {
                        resetValuesAfterError(data.status.message);
                    }
                })
        }
        else {
            console.log("validation failed");
        }
    }

    //================================================
    const showErrorMessage = () => {
        const hasError = values.error.length > 0;
        return (
            <div className="alert alert-danger text-center" style={{ display: hasError ? '' : 'none' }} >
                {values.error}
            </div>
        )
    }

    //================================================
    const showSuccessMessage = () => {
        const isSuccess = values.success.length > 0;
        return (
            <div className="alert alert-success text-center" style={{ display: isSuccess ? '' : 'none' }} >
                {values.success}
            </div>
        )
    }

    //================================================
    const newQuestionForm = () => {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="bg-info text-white text-center py-2 mb-4">
                        <h3><i className="fa fa-question-circle"></i> Creat New Question</h3>
                        {populateClasses()}
                        {populateSubjects()}
                    </div>
                    <div className="form-group" style={{ display: "none" }}>
                        <div className="input-group mb-2">
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    Ques. Type:
                            </div>
                            </div>
                            <select name="questionType">
                                <option>Multiple Type Questions</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group mb-2">
                            <div className="input-group-append">
                                <div className="input-group-text" style={{ alignItems: "baseline" }}>
                                    Question:
                            </div>
                            </div>
                            <textarea className="form-control"
                                id="questionName"
                                name="questionName"
                                rows="2"
                                value={questionName}
                                onChange={handleOnChange("questionName")}
                                placeholder="Enter the question" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group mb-2">
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    #1
                            </div>
                            </div>
                            <input type="text" className="form-control"
                                id="option1"
                                name="option1"
                                value={values.options[0].optionName}
                                onChange={handleOnChange("option", 0)}
                                placeholder="Enter option 1" required />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <input type="radio"
                                        id="isAnswer"
                                        name="isAnswer"
                                        onChange={handleIsAnswer(0)}
                                        checked={values.options[0].isAnswer} />&nbsp;is the answer
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group mb-2">
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    #2
                            </div>
                            </div>
                            <input type="text" className="form-control"
                                id="option2"
                                name="option2"
                                value={values.options[1].optionName}
                                onChange={handleOnChange("option", 1)}
                                placeholder="Enter option 2" required />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <input type="radio"
                                        id="isAnswer"
                                        name="isAnswer"
                                        onChange={handleIsAnswer(1)}
                                        checked={values.options[1].isAnswer} />&nbsp;is the answer
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group mb-2">
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    #3
                            </div>
                            </div>
                            <input type="text" className="form-control"
                                id="option3"
                                name="option3"
                                value={values.options[2].optionName}
                                onChange={handleOnChange("option", 2)}
                                placeholder="Enter option 3" required />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <input type="radio"
                                        id="isAnswer"
                                        name="isAnswer"
                                        onChange={handleIsAnswer(2)}
                                        checked={values.options[2].isAnswer} />&nbsp;is the answer
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group mb-2">
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    #4
                            </div>
                            </div>
                            <input type="text" className="form-control"
                                id="option4"
                                name="option4"
                                value={values.options[3].optionName}
                                onChange={handleOnChange("option", 3)}
                                placeholder="Enter option 4" required />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <input type="radio"
                                        id="isAnswer"
                                        name="isAnswer"
                                        onChange={handleIsAnswer(3)}
                                        checked={values.options[3].isAnswer} />&nbsp;is the answer
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group text-center">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                    <div>

                    </div>
                </form>
            </div>
        );
    }
    //================================================
    //
    //================================================
    return (
        <Layout>
            <div className="row">
                <div className="col-12">
                    {newQuestionForm()}
                    {showErrorMessage()}
                    {showSuccessMessage()}
                </div>
            </div>
            <div>
                {/* {JSON.stringify(values.options[0].optionName)} */}
            </div>
        </Layout>
    );
}

export default QuestionAdd;