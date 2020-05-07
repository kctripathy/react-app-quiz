import React, { useState } from "react";
import UserInformation from "../common/UserInformation";
import LayoutAdmin from "../pages/LayoutAdmin";
import UserSummary from "../common/UserSummary";

function AdminDashboard() {
  return (
    <LayoutAdmin title="Admin's Dashboard">
      <UserInformation />
      <UserSummary />
    </LayoutAdmin>
  );
}

export default AdminDashboard;
