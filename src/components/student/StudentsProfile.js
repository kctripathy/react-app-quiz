import React from "react";
import LayoutStudent from "../pages/LayoutStudent";
import UserInformation from "../common/UserInformation";

function StudentsProfile() {
  return (
    <LayoutStudent title="Student's Profile">
      <UserInformation />
    </LayoutStudent>
  );
}

export default StudentsProfile;
