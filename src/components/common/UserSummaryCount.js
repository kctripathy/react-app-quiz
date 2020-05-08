import React from "react";
import Spinner from "../common/Spinner";
import { notNull } from "../common/CommonFunctions";

export default function UserSummaryCount({ title, count, color }) {
  return (
    <div className="col-lg-3 col-xs-12 m-0 p-0">
      <div
        className={`card m-2 p-4 text-${
          color === "secondary" ? "dark" : color
        } text-center`}
      >
        <h4>{title}</h4>
        <strong
          className={`text-badge-large bg-${color} text-${
            color === "secondary" ? "dark" : "light"
          }`}
        >
          {notNull(count) ? count : <Spinner color="white" type="grow" />}
        </strong>
      </div>
    </div>
  );
}
