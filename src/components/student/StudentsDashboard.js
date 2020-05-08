import React, { useState } from "react";
import LayoutStudent from "../pages/LayoutStudent";
import StudentSummary from "./StudentSummary";
import UserExamSummary from "../common/UserExamSummary";

function StudentsDashboard() {
  return (
    <LayoutStudent title="Student's Dashboard">
      <StudentSummary />
      <UserExamSummary />
    </LayoutStudent>
  );
}

export default StudentsDashboard;
