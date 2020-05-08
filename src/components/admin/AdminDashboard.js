import React, { useState } from "react";
import LayoutAdmin from "../pages/LayoutAdmin";
import UserSummary from "../common/UserSummary";

function AdminDashboard() {
  return (
    <LayoutAdmin title="Admin's Dashboard">
      <UserSummary />
    </LayoutAdmin>
  );
}

export default AdminDashboard;
