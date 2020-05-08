import React, { Component } from "react";
import Spinner from "../common/Spinner";
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

  showLoadingOrNavigationButtons = () => {
    return this.props.quiz.loading ? (
      <Spinner />
    ) : (
      <div className="text-center">
        {this.props.quiz.config.allowBack && (
          <button
            id="first"
            className="btn-question-navigation"
            onClick={this.props.move}
          >
            <i className="fa fa-step-backward" aria-hidden="true"></i> First
          </button>
        )}
        {this.props.quiz.config.allowBack && (
          <button
            id="prev"
            className="btn-question-navigation"
            onClick={this.props.move}
          >
            <i className="fa fa-caret-left mr-1" aria-hidden="true"></i>
            Prev
          </button>
        )}
        <button
          id="next"
          className="btn-question-navigation"
          onClick={this.props.move}
        >
          Next
          <i className="fa fa-caret-right ml-1" aria-hidden="true"></i>
        </button>
        <button
          id="last"
          className="btn-question-navigation"
          onClick={this.props.move}
        >
          Last <i className="fa fa-step-forward" aria-hidden="true"></i>
        </button>
      </div>
    );
  };
  render() {
    let questions = this.props.quiz.questions
      ? this.props.quiz.questions.slice(
          this.props.pager.index,
          this.props.pager.index + this.props.pager.size
        )
      : [];
    return (
      <div id="quiz" className="d-block">
        <div className="row m-0 p-0">
          <div className="col-12">
            <h4 className="page-title text-center font-weight-normal">
              {this.props.quiz.name}
            </h4>
          </div>
          <div className="col-12">
            {questions.map((q) => (
              <div key={q.id} className="question-box d-block">
                <div className="badge badge-info">
                  Question {this.props.pager.index + 1} of{" "}
                  {this.props.pager.count}.
                </div>
                <h3 className="font-weight-normal">
                  {this.props.pager.index + 1}. <span>{q.questionName}</span>
                </h3>
                <div className="row text-left options m-0 p-0">
                  {q.options.map((option) => (
                    <div key={option.id} className="col-lg-6 col-sm-6 m-0 p-0">
                      <div className="option">
                        <label
                          className="font-weight-normal"
                          htmlFor={option.id}
                        >
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
          </div>
          <div className="col-12 mt-2 mb-2 text-center">
            {this.showLoadingOrNavigationButtons()}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
