import React from "react";
import { Link } from "react-router-dom";
import UsersLeftMenu from "../common/UsersLeftMenu";
import MenuListItem from "../common/MenuListItem";
export default function TeachersLeftMenu() {
  return (
    <ul className="list-group">
      {/* <li className="list-group-item">
        <Link className="nav-link" to="/user/profile">
          My Profile
        </Link>
      </li> */}
      <MenuListItem title="Dashboard" destination="/teacher/dashboard" />
      <MenuListItem title="Profile" destination="/teacher/profile" />
      <MenuListItem title="Calendar" destination="/teacher/exam-calendar" />
      <MenuListItem title="Add New Question" destination="/question/add" />
      <MenuListItem title="View Questions List" destination="/questions/list" />
      <MenuListItem title="Quiz / Mock Exam" destination="/quiz" />
      <MenuListItem
        title="Examination Maker"
        destination="/teacher/exam-maker"
      />
      <MenuListItem
        title="Evaluate / Review Exam"
        destination="/teacher/exam-review"
      />
      <MenuListItem title="Performance" destination="/teacher/performance" />
      <UsersLeftMenu />
    </ul>
  );
}
