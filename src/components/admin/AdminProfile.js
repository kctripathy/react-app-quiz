import React from "react";
import LayoutAdmin from "../pages/LayoutAdmin";
import UserInformation from "../common/UserInformation";

function AdminProfile() {
  return (
    <LayoutAdmin title="Admin's Profile">
      <UserInformation />
    </LayoutAdmin>
  );
}

export default AdminProfile;
