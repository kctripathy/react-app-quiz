import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import './QuizApp.css';
import Quiz from './Quiz';
import { ActionTypes } from '../../constants/actionTypes';
import {
  getAvailbleClassSubjectsByAccountId,
  removeDuplicates,
  getSubjectsByClassID,
  getQuestions
} from '../admin/index';
import Layout from '../pages/Layout';
import { isAuthenticated } from '../auth';

const mapStateToProps = state => { return { ...state.quiz } };

const mapDispatchToProps = dispatch => ({
  onQuizLoad: payload => dispatch({ type: ActionTypes.QuizLoad, payload }),
  onPagerUpdate: payload => dispatch({ type: ActionTypes.PagerUpdate, payload })
});

class QuizApp extends Component {


  state = {
    quizes: [],
    quizClassessSubects: [],
    quizClassess: [],
    quizSubjects: [],
    quizId: 0,
    accountId: 1,
    classId: 0,
    accessLevel: 1,
    error: ''
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  }


  componentDidMount() {
    this.loadClassAndSubjects();
    //this.load(this.state.quizId, this.state.accountId);
  }

  //========================================================
  loadClassAndSubjects = () => {
    // const user = isAuthenticated();
    // if (user == null || user === undefined) {
    //   return;
    // }

    const { accountId, classId, accessLevel } = isAuthenticated();
    //debugger;
    //const acc_id = accountId === 1 ? 0 : ; //if super admin has logged on then display all class subjects

    getAvailbleClassSubjectsByAccountId(accountId)
      .then(res => {

        if (res.status.code === "-200") {
          this.setState({ ...this.state, accessLevel: accessLevel, classId: classId, error: 'No questions found this account!' });
          return;
        }
        else if (res.status.code !== "1") {
          this.setState({ ...this.state, accessLevel: accessLevel, classId: classId, error: 'some error' });
          return;
        }

        //const user = isAuthenticated()
        //const accountId = user.accountId;

        const quizId = 0;
        const classSubjectsArrayList = removeDuplicates(res.result, 'classID');
        const classSubjectsForUser = classSubjectsArrayList.filter(cs => cs.classID === classId || accessLevel === 10);
        const quizSubjects = getSubjectsByClassID(res.result, classId);

        this.setState({
          quizClassessSubects: res.result,
          quizClassess: classSubjectsForUser,
          accountId: accountId,
          classId: classId,
          quizSubjects: quizSubjects,
          quizId: quizId,
          accessLevel: accessLevel,
          error: ''
        });
      })
  }


  //========================================================
  load(quizClassSubjectId, accountId) {

    getQuestions(quizClassSubjectId, accountId).then(
      response => {
        let quiz = response;
        quiz.questions.forEach(q => {
          q.options.forEach(o => o.selected = false);
        });
        quiz.config = Object.assign(this.props.quiz.config || {}, quiz.config);
        this.pager.count = quiz.questions.length / this.pager.size;
        this.props.onQuizLoad(quiz);
        this.props.onPagerUpdate(this.pager);
      }

    )
  }

  //=================================================================
  onChange = (e) => {
    if (e.target.value.length === 0) return;

    const classSubjectId = Number(e.target.value);
    this.setState({ quizId: classSubjectId });
    this.load(classSubjectId, this.state.accountId);
  }

  //=================================================================
  onChangeClassDropDown = (e) => {
    if (e.target.value.length === 0) return;

    const quizClassessSubects = this.state.quizClassessSubects;
    const quizSubjects = getSubjectsByClassID(quizClassessSubects, Number(e.target.value));
    this.setState({ quizSubjects: quizSubjects });
  }

  //========================================================
  availableClasses = () => {
    return this.state.error.length === 0 && (
      <Fragment>
        <label className="mr-1">Quiz for Class: </label>
        <select onChange={this.onChangeClassDropDown} >
          {this.state.accessLevel === 10 ? (<option>--- Select Class --- </option>) : ('')}
          {this.state.quizClassess.map(q => <option key={q.classSubjectID} value={q.classID}>{q.classDesc}</option>)}
          {/* {this.state.quizes.map(q => <option key={q.id} value={q.id}>{q.name}</option>)} */}
        </select>
      </Fragment>
    )
  }

  //========================================================
  // availableSubjects_DROPDOWN = () => {
  //   //console.log("available subjects ===========", this.state.quizSubjects)
  //   return (
  //     <Fragment>
  //       <label className="mr-1">Quiz for Class: </label>
  //       <select onChange={this.onChange} className="dropdown show">
  //         <option value="">--Select Subject--</option>
  //         {this.state.quizSubjects.map(q => <option key={q.classSubjectID} value={q.classSubjectID}>{q.subjectDesc}</option>)}
  //         {/* {this.state.quizes.map(q => <option key={q.id} value={q.id}>{q.name}</option>)} */}
  //       </select>
  //     </Fragment>
  //   )
  // }

  availableSubjects = () => {
    //console.log("available subjects ===========", this.state.quizSubjects)
    //debugger;
    return (
      <div className="btn-group dropdown" role="group" aria-label="Subjects">
        {this.state.quizSubjects.map(q => <button type="button" onClick={this.onChange} className="btn btn-secondary btn-sm ml-1 mr-1 " key={q.classSubjectID} value={q.classSubjectID}>{q.subjectDesc}</button>)}
      </div>

    )
  }




  //=========================================================================
  //
  //=========================================================================
  displayQuiz = () => {
    return (
      this.state.quizId && this.state.quizId > 0 ?
        (
          <Quiz quiz={this.state.quiz} quizId={this.state.quizId} mode={this.state.mode} />
        )
        :
        (
          this.state.error.length === 0 ? (
            <h2 className="alert alert-success text-center" style={{ padding: "50px", marginTop: "20px" }}>
              Please select a class & subject to load quiz
              </h2>
          ) : ('')
        )
    )
  }


  displayErrorMessage() {
    return (this.state.error.length > 0 &&
      <h2 className="alert alert-danger text-center" style={{ padding: "50px", marginTop: "20px" }}>
        {this.state.error}
      </h2>
    )
  }

  //=========================================================================
  render() {
    return (
      <Layout>
        <div className="row">
          <div className="col-12 text-center">
            {this.availableClasses()}
            {this.availableSubjects()}
          </div>
          <div className="col-12">
            {this.displayQuiz()}
          </div>
          <div className="col-12">
            {this.displayErrorMessage()}
            <pre>{JSON.stringify(this.state, null, 4)}</pre>
          </div>
        </div>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizApp);
