import React from "react";

export default function Spinner(props) {
  return (
    <div>
      <div className="spinner-border text-primary mr-2"></div>
      {props && props.title && props.title.length > 0
        ? props.title
        : "Loading..."}
    </div>
  );
}
