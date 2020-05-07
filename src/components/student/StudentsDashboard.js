import React, { useState } from "react";
import UserInformation from "../common/UserInformation";
import LayoutStudent from "../pages/LayoutStudent";

function StudentsDashboard() {
  return (
    <LayoutStudent title="Student's Dashboard">
      <UserInformation />
    </LayoutStudent>
  );
}

export default StudentsDashboard;
