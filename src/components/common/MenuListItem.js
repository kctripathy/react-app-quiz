import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import ProfileImage from "./ProfileImage";

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

  // const showLeftMenuItem = () => (
  //   <li
  //     className={`list-group-item list-group-item-action ${isActiveLeftMenu(
  //       destination
  //     )}`}
  //   >
  //     <Link to={`${destination}`}>{title}</Link>
  //   </li>
  // );

  const showLeftMenuItem = () => (
    <li
      className={`list-group-item list-group-item-action ${isActiveLeftMenu(
        destination
      )}`}
    >
      {/* <Link to={`${destination}`}>{title}</Link> */}
      <Link
        className="nav-link ml-2"
        to="#"
        onClick={() => history.push(`${destination}`)}
      >
        {title}
      </Link>
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
      return <li className="list-item-separator-blank"></li>;
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

  const showProfilePhoto = () => (
    <li className="nav-item">
      <ProfileImage />
    </li>
  );

  return menuType && menuType === "NavBar"
    ? showNavMenuItem()
    : menuType === "Separator"
    ? showLeftMenuItemSeparator()
    : menuType === "ProfileImage"
    ? showProfilePhoto()
    : showLeftMenuItem();
}

export default withRouter(MenuListItem);
