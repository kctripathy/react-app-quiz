import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../auth";
import MenuListItem from "./MenuListItem";

function UsersLeftMenu({ history }) {
  return (
    <Fragment>
      <MenuListItem
        title="Change Password"
        destination="/user/change-password"
      />
      <li className="list-group-item list-group-item-action">
        <Link
          className="nav-link ml-2"
          to="#"
          onClick={() =>
            logout(() => {
              history.push("/");
            })
          }
        >
          Logout
        </Link>
      </li>
    </Fragment>
  );
}

export default withRouter(UsersLeftMenu);
