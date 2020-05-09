import React from "react";

function Result(props) {
  let questions = props.questions;
  let totalCorrect = 0;
  let totalWrong = 0;
  let totalNotAttended = 0;

  questions.forEach((q) => {
    //debugger;
    let isQuestionAttended = q.options.some((x) => x.selected === true);
    if (isQuestionAttended) {
      q.isCorrect = q.options.every((x) => x.selected === x.isAnswer);
      q.isCorrect ? totalCorrect++ : totalWrong++;
    } else {
      totalNotAttended++;
    }
  });

  const showResult = () => (
    <div className="row m-0 p-2 d-flex flex-row text-center">
      <div className="col-4 text-success bg-light p-1">
        <b>
          Correct:{" "}
          <span className="badge badge-success  p-2">{totalCorrect}</span>
        </b>
      </div>
      <div className="col-4 text-primary bg-light p-1">
        <b>
          Unattempted:{" "}
          <span className="badge badge-primary  p-2">{totalNotAttended}</span>
        </b>
      </div>
      <div className="col-4 text-danger bg-light p-1">
        <b>
          Wrong: <span className="badge badge-danger  p-2">{totalWrong}</span>
        </b>
      </div>
    </div>
  );
  return (
    <div className="result">
      <h2 className="page-title text-center font-weight-normal">Quiz Result</h2>
      {showResult()}
      {questions.map((q, index) => (
        <div
          key={q.id}
          className={`mb-2 ${
            q.isCorrect
              ? "bg-success"
              : q.options.some((x) => x.selected === true)
              ? "bg-danger"
              : "bg-primary"
          }`}
        >
          <div className="result-question">
            <h5>
              {index + 1}. {q.questionName}
            </h5>
            <div className="row">
              {q.options.map((option) => (
                <div key={option.id} className="col-6">
                  <input
                    id={option.id}
                    type="checkbox"
                    disabled="disabled"
                    checked={option.selected}
                  />{" "}
                  {/* {option.optionName} */}
                  {option.isAnswer ? (
                    <span className="text-success">{option.optionName}</span>
                  ) : (
                    <span className="text-dark">{option.optionName}</span>
                  )}
                </div>
              ))}
            </div>
            <div
              className={`m-1 p-1 text-bold ${
                q.isCorrect
                  ? "text-success"
                  : q.options.some((x) => x.selected === true)
                  ? "text-danger"
                  : "text-primary"
              }`}
            >
              {q.isCorrect
                ? "Correct Answer!"
                : q.options.some((x) => x.selected === true)
                ? "Wrong Answer."
                : "Unattempted!"}
              .
            </div>
          </div>
        </div>
      ))}
      {showResult()}
    </div>
  );
}

export default Result;
