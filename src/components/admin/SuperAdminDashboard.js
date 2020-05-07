import React, { useState } from "react";
import UserInformation from "../common/UserInformation";
import LayoutSuperAdmin from "../pages/LayoutSuperAdmin";

function SuperAdminDashboard() {
  return (
    <LayoutSuperAdmin title="Super Admin's Dashboard">
      <UserInformation />
    </LayoutSuperAdmin>
  );
}

export default SuperAdminDashboard;
