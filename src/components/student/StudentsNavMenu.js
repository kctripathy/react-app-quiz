import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import UsersLeftMenu from "../common/UsersLeftMenu";
import MenuListItem from "../common/MenuListItem";

export default function StudentsNavMenu(props) {
  const showNavMenu = () => {
    return (
      <Fragment>
        <MenuListItem title="Quiz" destination="/quiz" menuType="NavBar" />

        <MenuListItem
          title="Dashboard"
          destination="/student/dashboard"
          menuType="NavBar"
        />

        {/* <li className="nav-item">
          <Link className={isActive(history, "/quiz")} to="/quiz">
            Quiz
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={isActive(history, "/student/dashboard")}
            to="/student/dashboard"
          >
            Dashboard
          </Link>
        </li> */}
      </Fragment>
    );
  };
  return showNavMenu();
}
