import React from "react";
import Layout from "../pages/Layout";
import Register from "../common/Register";
import LayoutAdmin from "../pages/LayoutAdmin";
import LayoutSuperAdmin from "../pages/LayoutSuperAdmin";
import { isAuthenticated } from "../auth";
import { Role } from "../../constants";

function UserAdd() {
  const accessLevel = isAuthenticated().accessLevel;

  const showAddForAdmin = () => (
    <LayoutAdmin title="Add new user">
      <Register isAdmin="yes" />
    </LayoutAdmin>
  );

  const showAddForSuperAdmin = () => (
    <LayoutSuperAdmin title="Add new user">
      <Register isAdmin="yes" accessLevel={accessLevel} />
    </LayoutSuperAdmin>
  );

  return accessLevel === Role.SuperAdmin
    ? showAddForSuperAdmin()
    : showAddForAdmin();
}

export default UserAdd;
