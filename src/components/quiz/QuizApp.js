import React, { Component } from 'react';
import { connect } from 'react-redux';

import './QuizApp.css';
import Quiz from './Quiz';
import { ActionTypes } from '../../constants/actionTypes';
import {getAvailbleClassSubjectsByAccountId,
        removeDuplicates,
        getSubjectsByClassID} from '../admin/index';

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
    quizClassess:[],
    quizSubjects:[],
    quizId: 17
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  }

  componentDidMount() {
    this.loadClassAndSubjects();
     this.load(this.state.quizId);
  }

  loadClassAndSubjects = () =>{
    getAvailbleClassSubjectsByAccountId(1)
    .then(res =>{
      const classSubjectsArrayList = removeDuplicates(res.result,'classID');
      this.setState({        
        quizClassessSubects: res.result,
          quizClassess: classSubjectsArrayList
        });      
    })   
  }


  load(quizClassSubjectId) {
    // let url = quizId || this.props.quizId;
    // fetch(`../${url}`).then(res => res.json()).then(res => {
    //   let quiz = res;
    //   quiz.questions.forEach(q => {
    //     q.options.forEach(o => o.selected = false);
    //   });

    let url = `http://localhost:5555/api/questions/${quizClassSubjectId}/1`;
    fetch(`${url}`)
    .then(res => res.json())
    .then(res => {
      //debugger;
      let quiz = res;
      quiz.questions.forEach(q => {
        q.options.forEach(o => o.selected = false);
      });


      quiz.config = Object.assign(this.props.quiz.config || {}, quiz.config);
      this.pager.count = quiz.questions.length / this.pager.size;
      this.props.onQuizLoad(quiz);
      this.props.onPagerUpdate(this.pager);
    });
  }

  onChange = (e) => {
    if (e.target.value.length === 0) return;

    const classSubjectId = parseInt(e.target.value);
    this.setState({ quizId: classSubjectId  });
    this.load(classSubjectId);
  }

onChangeClassDropDown = (e) =>{
  if (e.target.value.length === 0) return;

  console.log("e=", e.target.value);
  const quizClassessSubects = this.state.quizClassessSubects;
  const quizSubjects = getSubjectsByClassID(quizClassessSubects, parseInt(e.target.value));
  console.log('quizSubjects',quizSubjects);
  debugger;

  this.setState({quizSubjects: quizSubjects});
console.log(this.state);
debugger;

}



  //========================================================
  availableClasses = () =>{ 
    return (
         <select onChange={this.onChangeClassDropDown}>
           <option value="">--Select Class--</option>
            {this.state.quizClassess.map(q => <option key={q.classSubjectID} value={q.classID}>{q.classDesc}</option>)}
            {/* {this.state.quizes.map(q => <option key={q.id} value={q.id}>{q.name}</option>)} */}
          </select> 

    )
  } 

  availableSubjects = () =>{ 
    console.log("available subjects ===========",this.state.quizSubjects)
    return (
         <select onChange={this.onChange}>
           <option value="">--Select Subject--</option>
            {this.state.quizSubjects.map(q => <option key={q.classSubjectID} value={q.classSubjectID}>{q.subjectDesc}</option>)}
            {/* {this.state.quizes.map(q => <option key={q.id} value={q.id}>{q.name}</option>)} */}
          </select> 

    )
  } 
//=========================================================================
  render() {
    return (
      <div className="container">
        <div className="p-2">
          <div className="row">
            <div className="col-6">             
                <h3>Quiz:</h3>
            </div>
            <div className="col-6 text-right">
              <label className="mr-1">Quiz: </label>
              {this.availableClasses()}
              {this.availableSubjects()}
              {/* {JSON.stringify(this.state.quizes)} */}
            </div>
          </div>
        </div>
        <Quiz quiz={this.state.quiz} quizId={this.state.quizId} mode={this.state.mode} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizApp);
