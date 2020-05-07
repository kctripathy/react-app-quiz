import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Register from "../common/Register";
import LayoutAdmin from "../pages/LayoutAdmin";
import LayoutSuperAdmin from "../pages/LayoutSuperAdmin";
import { isAuthenticated } from "../auth";
import { Role } from "../../constants";

function UserEdit({ usersData, match }) {
  const accessLevel = isAuthenticated().accessLevel;
  const showUser = () => {
    const user = usersData.users.filter(
      (u) => u.id === Number(match.params.userId)
    );
    //debugger;
    return (
      user && (
        <Register
          isAdmin="yes"
          mode="edit"
          user={user}
          accessLevel={accessLevel}
        />
      )
    );
  };

  const editAdminUsers = () => (
    <LayoutAdmin title="Edit User">
      {showUser()}
      {/* {JSON.stringify(user)} */}
    </LayoutAdmin>
  );

  const editSuperAdminUsers = () => (
    <LayoutSuperAdmin title="Edit User">
      {showUser()}
      {/* {JSON.stringify(user)} */}
    </LayoutSuperAdmin>
  );

  return accessLevel === Role.Admin ? editAdminUsers() : editSuperAdminUsers();
}

const mapStateToProps = (state) => {
  return {
    usersData: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    //fetchUsers: () => dispatch(fetchUsers())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
