import React from "react";
import { Link } from "react-router-dom";
import UsersLeftMenu from "../common/UsersLeftMenu";

export default function UsersLeftMenuitems() {
  return (
    <ul className="list-group">
      <li className="list-group-item">
        <Link className="nav-link" to="/student/dashboard">
          Dashboard
        </Link>
      </li>
      <li className="list-group-item">
        <Link className="nav-link" to="/user/profile">
          My Profile
        </Link>
      </li>
      <li className="list-group-item">
        <Link className="nav-link" to="/quiz">
          Exam / Quiz
        </Link>
      </li>
      <li className="list-group-item">
        <Link className="nav-link" to="/user/quiz/results">
          View Results
        </Link>
      </li>
      <UsersLeftMenu />
    </ul>
  );
}
