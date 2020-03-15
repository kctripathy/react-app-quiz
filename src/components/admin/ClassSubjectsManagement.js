import React, { useState } from 'react';
import Layout from '../pages/Layout'
import { useHttpGet } from '../../hooks/useHttp';
import {
    addNewMasterClass,
    deleteMasterClass,
    addNewMasterSubject,
    deleteMasterSubject,
    addNewMasterClassSubject,
    deleteMasterClassSubject,
    removeByAttr
} from './index';

//==========================================================
// This component will manage master classes, subjects and 
// It will also let super admin set which class has which subjects. 
// It will helpful while creating a new account
//==========================================================
function ClassSubjectsManagement(props) {
    const [isLoadingClasses, classes] = useHttpGet('Classes')
    const [isLoadingSubjects, subjects] = useHttpGet('Subjects')
    const [isLoadingClassSubjects, allClassesSubjects] = useHttpGet('ClassesSubjects/all/0')

    const [newClassName, setNewClassName] = useState('');
    const [newSubjectName, setNewSubjectName] = useState('');
    const [classSubjects, setClassSubjects] = useState([]);
    const [selectedClass, setSelectedClass] = useState(0);
    const [selectedSubject, setSelectedSubject] = useState(0);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [run, setRun] = useState(false);

    //==========================================================
    const addNewSubject = (e) => {
        e.preventDefault();
        //console.log("newSubjectName", newSubjectName);
        if (newSubjectName === '' || newSubjectName.length === 0) {
            alert("Please enter a subject name");
            return;
        }
        else {
            debugger;
            const isExists = subjects.some((c) => c.name && c.name.toUpperCase().trim() === newSubjectName.toUpperCase().trim());
            if (isExists) {
                //alert(`The subject (${newSubjectName}) already exists !`);
                setSuccess('');
                setError(`The subject (${newSubjectName}) already exists !`);
                return;
            }
        }
        addNewMasterSubject({ name: newSubjectName, description: newSubjectName + ' Quiz' })
            .then(data => {
                //debugger;
                subjects.push(data);
                setNewSubjectName('');
                setSuccess('Successfuly added the subject!');
                setError('');
            })
    };

    //==========================================================
    const addNewClass = (e) => {
        e.preventDefault();
        if (newClassName === '' || newClassName.length === 0) {
            //alert("Please enter a class name");
            setError('Please enter a class name');
            setSuccess('');
            return;
        }
        else {
            const isExists = classes.some((c) => c.description.toUpperCase().trim() === newClassName.toUpperCase().trim());
            if (isExists) {
                //alert(`The class (${newClassName}) already exists !`);
                setError(`The class (${newClassName}) already exists !`);
                setSuccess('');
                return;
            }
        }

        addNewMasterClass({ description: newClassName.trim() })
            .then(data => {
                //debugger;
                classes.push(data);
                setNewClassName('');
                setSuccess('Successfuly added the class!');
                setError('');
            })
    };

    //==========================================================
    const addNewClassSubject = (e) => {
        e.preventDefault();

        const className = classes.filter((c) => c.id === selectedClass).map(c => c.description).toString();;
        const subjectName = subjects.filter((s) => s.id === selectedSubject).map(s => s.description).toString();

        if (selectedClass === 0 || selectedSubject === 0) {
            alert("Please select class and subject");
            return;
        }
        else {
            const isExists = classSubjects && classSubjects.length > 0 && classSubjects.some((cs) => cs.classID === selectedClass && cs.subjectID === selectedSubject);
            if (isExists) {
                setSuccess('');
                setError(`The subject (${subjectName}) already exists in the class ${className} !`);
                return;
            }
        }
        addNewMasterClassSubject({ ClassId: selectedClass, SubjectId: selectedSubject, AccountId: 0 })
            .then(data => {
                const newId = {
                    classSubjectID: data.id,
                    classID: selectedClass,
                    classDesc: className,
                    subjectID: selectedSubject,
                    subjectDesc: subjectName,
                    accountId: 0,
                    accountName: "",
                };
                setClassSubjects([...classSubjects, newId]);
                setSuccess('Successfully added the subject to the class');
                setError('');
            })

    };


    //==========================================================
    const deleteSubject = (id) => {
        if (!(window.confirm('Delete the item?'))) {
            return;
        }

        deleteMasterSubject(id)
            .then(data => {
                //debugger;
                removeByAttr(subjects, 'id', id);
                setSuccess('Successfuly deleted the subject!');
                setError('');
                setRun(!run);
                //alert("Successfuly deleted the subject");
            })
    };

    //==========================================================
    const deleteClassSubject = (id) => {
        //alert(id);
        deleteMasterClassSubject(id)
            .then(data => {
                //debugger;
                const newClassSubjects = classSubjects.filter(cs => cs.classSubjectID !== id);
                setClassSubjects(newClassSubjects);
                setSuccess('Succesfully deleted the subject from the class');
                setError('');
                setRun(!run);
            })
            .catch(err => {
                setSuccess('');
                setError(err);
                setRun(!run);
            })
    };

    //==========================================================
    const deleteClass = (id) => {

        if (!(window.confirm('Delete the item?'))) {
            return;
        }
        //alert(id);
        deleteMasterClass(id)
            .then(data => {
                //debugger;
                removeByAttr(classes, 'id', id);
                setSuccess('Successfully deleted the class!');
                setError('');
                setRun(!run);
                // alert("Successfuly deleted the class");
            })
    };

    //==========================================================
    const selectSubjectsByClass = (e) => {
        debugger;
        const classSubjects = allClassesSubjects &&
            allClassesSubjects.result !== undefined &&
            allClassesSubjects.result.length > 0 &&
            allClassesSubjects.result.filter(c => c.classID === Number(e.target.value));
        setClassSubjects(classSubjects);
        setSelectedClass(Number(e.target.value));
    };

    //==========================================================
    const classesDropdownList = () => (
        <select name="ddlClass"
            onChange={selectSubjectsByClass}
            style={{ width: "225px", marginRight: "10px" }}>
            <option>--Select Class--</option>
            {
                classes && classes.map(c => {
                    return <option key={c.id} value={c.id}>{c.description}</option>
                })
            }
        </select>
    );

    //==========================================================
    const subjectsDropdownList = () => (
        <select name="newSubject"
            onChange={(e) => setSelectedSubject(Number(e.target.value))}
            style={{ width: "185px", marginLeft: "10px" }}>
            <option>--Select Subject--</option>
            {
                subjects && subjects.map(subject => {
                    return <option key={subject.id} value={subject.id}>{subject.name}</option>
                })
            }
        </select>
    );

    //==========================================================
    const classesList = () => (
        <ul>
            <li><h5>Master Classes</h5></li>
            {
                classes && classes
                    .sort((a, b) => b.id - a.id)
                    .map(c => {
                        return <li key={c.id}>
                            {/* {c.id} - {c.description} */}
                            <span>{c.id} - {c.description}</span>
                            <span className="buttons">
                                {/* <button className="btn btn-info btn-sm mr-0 p-2" onClick={() => editClass(c.id)}>edit</button> */}
                                <button className="close btn btn-danger btn-sm ml-0 p-2"
                                    onClick={() => deleteClass(c.id)}>X</button>
                            </span>
                        </li>
                    })
            }
        </ul>
    );

    //==========================================================
    const subjectsList = () => (
        <ul>
            <li>
                <h5>Master Subjects </h5>
            </li>
            {
                subjects && subjects
                    .sort((a, b) => b.id - a.id)
                    .map(s => {
                        return <li key={s.id}>
                            <span>{s.id} - {s.name}</span>
                            <span className="buttons">
                                {/* <button className="btn btn-info btn-sm mr-0 p-2" onClick={() => editSubject(s.id)}>edit</button> */}
                                <button className="close btn btn-danger btn-sm ml-0 p-2"
                                    onClick={() => deleteSubject(s.id)}>X</button>
                            </span>
                        </li>

                    })
            }
        </ul>
    );

    //==========================================================
    const subjectsOfClassList = () => (
        <ul>
            <li>
                {classSubjects && classSubjects.length > 0 ? (<h5>Subjects </h5>) : ('')}
            </li>
            {
                classSubjects && classSubjects
                    .sort((a, b) => b.classSubjectID - a.classSubjectID)
                    .map(s => {
                        return <li key={s.subjectID}>
                            <span>{s.subjectID} - {s.subjectDesc}</span>
                            <span className="buttons">
                                {/* <button className="btn btn-info btn-sm mr-0 p-2" onClick={() => editSubject(s.id)}>edit</button> */}
                                <button className="close btn btn-danger btn-sm ml-0 p-2"
                                    onClick={() => deleteClassSubject(s.classSubjectID)}>X</button>
                            </span>

                        </li>
                    })
            }
        </ul>
    );

    //==========================================================
    const newSubjectEntryForm = () => (
        <form onSubmit={addNewSubject}>
            {/* {classesDropdownList()} */}
            <input required
                type="text"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                placeholder="Enter New Subject Name"
                style={{ width: "285px" }}
                maxLength="35" />
            <button className="btn btn-info btn-sm ml-2">Add New Subject </button>
        </form>
    );

    //==========================================================
    const newClassEntryForm = () => (
        <form onSubmit={addNewClass}>
            {/* {classesDropdownList()} */}
            <input required
                type="text"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                placeholder="Enter New Class Name"
                style={{ width: "290px" }}
                maxLength="35"
            />
            <button className="btn btn-info btn-sm ml-2">Add New Class </button>
        </form>
    );

    //==========================================================
    const showSucessMessage = () => (
        <div className="alert alert-success m-1 p-2 text-center" style={{ display: success.length > 0 ? '' : 'none' }}>
            <b>{success}</b>
            <button className="close" style={{ float: "right" }}
                onClick={() => setSuccess('')}
            >&times;</button>
        </div>
    );

    //==========================================================
    const showErrorMessage = () => (
        <div className="alert alert-danger m-1 p-2 text-center" style={{ display: error.length > 0 ? '' : 'none' }}>
            <b>{error}</b>
            <button className="close" style={{ float: "right" }}
                onClick={() => setError('')}
            >&times;</button>
        </div>
    );

    //==========================================================
    return (<Layout title="Manage Classes and Subjects">
        <div className="row" id="classSubjectDiv">
            <div className="col-12">
                {showSucessMessage()}
                {showErrorMessage()}
            </div>
            <div className="col-lg-4 col-sm-12">
                {newClassEntryForm()}
                {isLoadingClasses ? (<p>Loading classes...</p>) : (classesList())}
            </div>
            <div className="col-lg-4 col-sm-12">
                {newSubjectEntryForm()}
                {isLoadingSubjects ? (<p>Loading Subjects...</p>) : (subjectsList())}
            </div>
            <div className="col-lg-4 col-sm-12">
                <h5>Subjects for the Class:</h5>
                <form onSubmit={addNewClassSubject}>
                    <div className="row">
                        <div className="col-6">{classesDropdownList()} </div>
                        <div className="col-6"> {subjectsDropdownList()} </div>
                        <div className="col-12">
                            <button className="btn btn-info btn-sm btn-block">
                                Add Subject To The Class
                            </button>
                        </div>
                    </div>
                </form>
                <div className="row">
                    <div className="col-12">
                        {subjectsOfClassList()}
                    </div>
                </div>
            </div>
        </div>
    </Layout>);
    //==========================================================
};

export default ClassSubjectsManagement;