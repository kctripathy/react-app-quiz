import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

function MenuListItem({
  history,
  destination,
  viewDestination,
  title,
  showBadge,
  addview,
  menuType,
}) {
  const isActiveLeftMenu = (path) => {
    if (history.location.pathname === path) {
      return "active-left-menu arrow-right";
    } else {
      return "inactive-left-menu";
    }
  };

  const isActiveNavMenu = (path) => {
    if (history.location.pathname === path) {
      return "active";
    } else {
      return "inactive";
    }
  };

  const showLeftMenuItem = () => (
    <li
      className={`list-group-item list-group-item-action ${isActiveLeftMenu(
        destination
      )}`}
    >
      <Link to={`${destination}`}>{title}</Link>
    </li>
  );

  const showLeftMenuItemSeparator = () => {
    if (title && title.length > 0) {
      return (
        <li className="list-group-item list-group-item-action list-item-separator">
          {title}
        </li>
      );
    } else {
      return (
        <li
          style={{
            marginLeft: "5px",
            height: "5px !important",
            backgroundColor: "#eee",
            width: "100%",
            listStyleType: "none",
          }}
        >
          &nbsp;
        </li>
      );
    }
  };

  const showNavMenuItem = () => (
    <li className="nav-item">
      <Link
        to={`${destination}`}
        className={`nav-link ml-2 ${isActiveNavMenu(destination)}`}
      >
        {title}
      </Link>
    </li>
  );

  return menuType && menuType === "NavBar"
    ? showNavMenuItem()
    : menuType === "Separator"
    ? showLeftMenuItemSeparator()
    : showLeftMenuItem();
}

export default withRouter(MenuListItem);
