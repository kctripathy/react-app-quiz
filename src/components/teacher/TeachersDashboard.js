import React, { useState } from "react";
import LayoutTeacher from "../pages/LayoutTeacher";
import QuestionSummary from "../common/QuestionSummary";

function TeachersDashboard() {
  return (
    <LayoutTeacher title="Teacher's Dashboard">
      <QuestionSummary />
    </LayoutTeacher>
  );
}

export default TeachersDashboard;
