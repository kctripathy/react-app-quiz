import React, { Component } from "react";
import { ActionTypes } from "../../constants/actionTypes";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  ...state.quiz,
  ...state.mode,
  ...state.pager,
});

const mapDispatchToProps = (dispatch) => ({
  onAnswer: (payload) => dispatch({ type: ActionTypes.QuizAnswer, payload }),
});

class Questions extends Component {
  onAnswer(question, option) {
    //debugger;
    let quiz = JSON.parse(JSON.stringify(this.props.quiz));
    let q = quiz.questions.find((x) => x.id === question.id);
    if (q.questionTypeId === 1) {
      q.options.forEach((x) => {
        x.selected = false;
      });
    }
    q.options.find((x) => x.id === option.id).selected = true;
    this.props.onAnswer(quiz);
  }

  render() {
    let questions = this.props.quiz.questions
      ? this.props.quiz.questions.slice(
          this.props.pager.index,
          this.props.pager.index + this.props.pager.size
        )
      : [];
    return (
      <div id="quiz">
        <h2 className="page-title text-center font-weight-normal">
          {this.props.quiz.name}
        </h2>
        <hr />
        {questions.map((q) => (
          <div key={q.id} className="question-box">
            <div className="badge badge-info">
              Question {this.props.pager.index + 1} of {this.props.pager.count}.
            </div>
            <h3 className="font-weight-normal">
              {this.props.pager.index + 1}. <span>{q.questionName}</span>
            </h3>
            <div className="row text-left options m-0 p-0">
              {q.options.map((option) => (
                <div key={option.id} className="col-lg-6 col-sm-6 m-0 p-0">
                  <div className="option">
                    <label className="font-weight-normal" htmlFor={option.id}>
                      <input
                        id={option.id}
                        name={option.questionId}
                        checked={option.selected}
                        type="checkbox"
                        onChange={() => this.onAnswer(q, option)}
                      />
                      {option.optionName}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <hr />
        <div className="text-center">
          {this.props.quiz.config.allowBack && (
            <button
              id="first"
              className="btn btn-primary"
              onClick={this.props.move}
            >
              <i className="fa fa-step-backward" aria-hidden="true"></i> First
            </button>
          )}
          {this.props.quiz.config.allowBack && (
            <button
              id="prev"
              className="btn btn-primary"
              onClick={this.props.move}
            >
              <i className="fa fa-caret-left mr-1" aria-hidden="true"></i>Prev
            </button>
          )}
          <button
            id="next"
            className="btn btn-primary"
            onClick={this.props.move}
          >
            Next<i className="fa fa-caret-right ml-1" aria-hidden="true"></i>
          </button>
          <button
            id="last"
            className="btn btn-primary"
            onClick={this.props.move}
          >
            Last <i className="fa fa-step-forward" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
