import React from "react";

export default function Spinner(props) {
  return (
    <div>
      <div
        className={`spinner-${props.type ? props.type : "border"} text-${
          props.color ? props.color : "primary"
        } mr-2 quiz-spinner`}
      ></div>
      {props && props.title && props.title.length > 0 ? props.title : ""}
    </div>
  );
}
