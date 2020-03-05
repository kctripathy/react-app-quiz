import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/index';

import {
    deleteQuestion,
    getAllClassSubjectsByAccountId,
    removeDuplicates,
    getSubjectsByClassID,
    getAllQuestionsByAccountId
} from './index';

import Layout from '../pages/Layout';

function QuestionList({ match }) {

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
        success: '',
        isLoading: true
    });

    const [questions, setQuestions] = useState([]);
    const [questionList, setQuestionList] = useState([]);
    const [classSubjects, setClassSubjects] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const { questionName } = values;


    useEffect(() => {

        const questionId = match.params.questionId;
        //console.log('questionId', questionId);


        //Set the AccountId for the user
        const user = isAuthenticated();
        //console.log('user', user);

        getAllQuestionsByAccountId(user.accountId)
            .then(data => {
                setQuestions(data);
                setQuestionList(data);
                // Load all classes after getting all class subjects for the account id
                getAllClassSubjectsByAccountId(user.accountId)
                    .then(data1 => {
                        if (data1 !== undefined && data1.status.code > 0) {
                            setClassSubjects(data1.result);
                            setValues({
                                ...values,
                                accountId: user.accountId,
                                isLoading: false,
                                error: ''
                            })
                        }
                    })
            })
    }, [])


    //================================================
    // Get the classes dropdown options
    //================================================
    const populateClassesDropDown = (arrSource) => {
        return (
            <select name="ddlClass" onChange={handleClassOnChange} required>
                <option value="">--All Classes --</option>
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
                <option value="">--All Subjects --</option>
                {subjects.length > 0 && subjects.map(c => {
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
    const handleClassOnChange = (e) => {
        //debugger;
        e.preventDefault();
        //console.log("class id", e.target.value);
        // setValues({
        //     ...values,
        //     classSubjectId: 0
        // })
        if (e.target.value === "") {
            setQuestions(questionList);
            setSubjects({});
        }
        else {

            const subjectsForTheClass = getSubjectsByClassID(classSubjects, e.target.value);
            setSubjects(subjectsForTheClass);

            const classQuestions = questionList.filter((q) => q.classId === Number(e.target.value))
            setQuestions(classQuestions);
        }

    }

    //================================================    
    const handleSubjectOnChange = (e) => {
        e.preventDefault();
        const filteredQuestions = questionList.filter((q) => q.classSubjectId === parseInt(e.target.value));
        setQuestions(filteredQuestions);

        setValues({
            ...values,
            isLoading: false
        })
    }


    //================================================
    const showLoadingMessage = () => {
        //const isLoading = questions && questions.length == 0; 
        return (
            <div className="alert alert-danger text-center" style={{ display: values.isLoading ? '' : 'none' }} >
                Loading...
            </div>
        )
    }

    //================================================
    const showEmptyMessage = () => {
        //const isLoading = questions && questions.length == 0; 
        return (
            <div className="alert alert-danger text-center" style={{ display: !values.isLoading && questions && questions.length === 0 ? '' : 'none' }} >
                No Questions Found for the selected class and subject
                </div>
        )
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

    const showPageTitle = () => {

        return <h3>Manage Questions</h3>
    }
    //================================================
    const listOfQuestions = () => {
        return (
            <div className="row">
                <div className="col-12">
                    {
                        questions.map((q, i) => {
                            return (
                                <ul key={q.id} className="questionList">
                                    <li className="name">
                                        <ul>
                                            <li>
                                                Question#{++i}: <Link to={`/question/edit/${q.id}`}>{q.questionName}</Link>

                                                {/* ....ClassSubjectId={q.classSubjectId} | ClassId={q.classId} |SubjectId={q.subjectId} */}

                                            </li>
                                            <li>
                                                <ul className="optionList">
                                                    {
                                                        q.options.map((o, i) => (

                                                            <li key={o.id} className={o.isAnswer ? "list-answer" : "list-option"}>
                                                                Option#{i + 1}: {o.optionName}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="buttons">
                                        <Link to={`/question/edit/${q.id}`}>
                                            <button className="btn btn-info btn-sm">
                                                Edit
                                            </button>
                                        </Link>
                                        <button className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                if (window.confirm('Delete the item?')) (deleteTheQuestion(q.id))
                                            }
                                            }>
                                            Delete
                                        </button>
                                    </li>
                                </ul>)
                        })
                    }
                </div>
            </div >
        )
    }
    const deleteTheQuestion = (id) => {

        //alert(id);
        deleteQuestion(id)
            .then(response => {
                const allQuestions = questionList.filter((q) => q.id !== id);
                const freshQuestions = questions.filter((q) => q.id !== id);

                setQuestionList(allQuestions);
                setQuestions(freshQuestions);
                //alert(values.classSubjectId);
                // setQuestions(freshQuestions);
                // setValues({
                //     ...values,
                //     classSubjectId: 0
                // })
                alert(id + 'deleted successfully')
            })
            .catch(err => {
                alert('failed to delete because: ' + err);
            })
    }

    //================================================
    //
    //================================================
    return (
        <Layout>
            <div className="row">
                <div className="col-12">
                    <div className="bg-info text-white text-center py-2 mb-2">
                        {showPageTitle()}
                        {populateClasses()}
                        {populateSubjects()}
                    </div>
                </div>
            </div>
            {showLoadingMessage()}
            {listOfQuestions()}
            {showEmptyMessage()}
            <div className="row">
                <div className="col-12">

                    {showErrorMessage()}
                    {showSuccessMessage()}
                </div>
            </div>
            <div>
                {/* {JSON.stringify(questions, null, 4)} */}
            </div>
        </Layout>
    );
}

export default QuestionList;