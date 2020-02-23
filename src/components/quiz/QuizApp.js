import React, { Component } from 'react';
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
    quizes: [
      { id: 'data/javascript.json', name: 'Javascript' },
      { id: 'data/aspnet.json', name: 'Asp.Net' },
      { id: 'data/csharp.json', name: 'C Sharp' },
      { id: 'data/designPatterns.json', name: 'Design Patterns' }
    ],
    quizClassessSubects: [],
    quizClassess: [],
    quizSubjects: [],
    quizId: 0,
    accountId: 1
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
    getAvailbleClassSubjectsByAccountId(1)
      .then(res => {
        const classSubjectsArrayList = removeDuplicates(res.result, 'classID');
        const user = isAuthenticated()
        const accountId = user.accountId;
        const quizId = 0;

        this.setState({
          quizClassessSubects: res.result,
          quizClassess: classSubjectsArrayList,
          accountId: accountId,
          quizId: quizId
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

    const classSubjectId = parseInt(e.target.value);
    this.setState({ quizId: classSubjectId });
    this.load(classSubjectId, this.state.accountId);
  }

  //=================================================================
  onChangeClassDropDown = (e) => {
    if (e.target.value.length === 0) return;

    const quizClassessSubects = this.state.quizClassessSubects;
    const quizSubjects = getSubjectsByClassID(quizClassessSubects, parseInt(e.target.value));
    this.setState({ quizSubjects: quizSubjects });
  }

  //========================================================
  availableClasses = () => {
    return (
      <select onChange={this.onChangeClassDropDown}>
        <option value="">--Select Class--</option>
        {this.state.quizClassess.map(q => <option key={q.classSubjectID} value={q.classID}>{q.classDesc}</option>)}
        {/* {this.state.quizes.map(q => <option key={q.id} value={q.id}>{q.name}</option>)} */}
      </select>

    )
  }

  //========================================================
  availableSubjects = () => {
    console.log("available subjects ===========", this.state.quizSubjects)
    return (
      <select onChange={this.onChange}>
        <option value="">--Select Subject--</option>
        {this.state.quizSubjects.map(q => <option key={q.classSubjectID} value={q.classSubjectID}>{q.subjectDesc}</option>)}
        {/* {this.state.quizes.map(q => <option key={q.id} value={q.id}>{q.name}</option>)} */}
      </select>

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
          <h4 className="alert alert-success" style={{ padding: "50px", marginTop: "20px" }}>Please select class and subject to load quiz</h4>
        )
    )
  }

  //=========================================================================
  render() {
    return (
      <Layout>
        <div className="row">
          <div className="col-12 text-center">
            <label className="mr-1">Quiz: </label>
            {this.availableClasses()}
            {this.availableSubjects()}
          </div>
          <div className="col-12">
            {this.displayQuiz()}
          </div>
        </div>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizApp);
