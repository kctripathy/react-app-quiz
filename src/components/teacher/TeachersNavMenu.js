import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MenuListItem from "../common/MenuListItem";

export default function TeachersNavMenu() {
  return (
    <Fragment>
      <MenuListItem
        title="Dashboard"
        destination="/teacher/dashboard"
        menuType="NavBar"
      />
    </Fragment>
  );
}
