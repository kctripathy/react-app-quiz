import React from "react";
import LayoutTeacher from "../pages/LayoutTeacher";
import UserInformation from "../common/UserInformation";

function TeachersProfile() {
  return (
    <LayoutTeacher title="Teacher's Profile">
      <UserInformation />
    </LayoutTeacher>
  );
}

export default TeachersProfile;
