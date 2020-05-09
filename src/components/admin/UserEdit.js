import React, { useEffect, useState } from "react";
import Register from "../common/Register";
import LayoutAdmin from "../pages/LayoutAdmin";
import LayoutSuperAdmin from "../pages/LayoutSuperAdmin";
import { isAuthenticated } from "../auth";
import { Role } from "../../constants";
//import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../constants/actionMethods";

const UserEdit = ({ match }) => {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const accessLevel = isAuthenticated().accessLevel;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [match.params.userId]);
  //===================================================
  //
  //===================================================
  const showUser = () => {
    const user = state.users.filter(
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

  //===================================================
  //
  //===================================================
  const editAdminUsers = () => (
    <LayoutAdmin title="Edit User">
      {showUser()}
      <pre>{JSON.stringify(state, null, 4)}</pre>
    </LayoutAdmin>
  );

  //===================================================
  //
  //===================================================
  const editSuperAdminUsers = () => (
    <LayoutSuperAdmin title="Edit User">
      {showUser()}
      {/* {JSON.stringify(user)} */}
    </LayoutSuperAdmin>
  );

  return accessLevel === Role.Admin ? editAdminUsers() : editSuperAdminUsers();
};

export default UserEdit;

// const mapStateToProps = (state) => {
//   return {
//     usersData: state.user,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchUsers: () => dispatch(fetchUsers()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
