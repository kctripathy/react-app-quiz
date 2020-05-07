import React from "react";
import LayoutSuperAdmin from "../pages/LayoutSuperAdmin";
import UserInformation from "../common/UserInformation";

function SuperAdminProfile() {
  return (
    <LayoutSuperAdmin title="Super Admin's Profile">
      <UserInformation />
    </LayoutSuperAdmin>
  );
}

export default SuperAdminProfile;
