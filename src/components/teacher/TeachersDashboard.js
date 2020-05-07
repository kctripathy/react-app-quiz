import React, { useState } from "react";
//import Layout from "../pages/Layout";
import UserInformation from "../common/UserInformation";
import TeachersLeftMenu from "./TeachersLeftMenu";
import LayoutTeacher from "../pages/LayoutTeacher";

function TeachersDashboard() {
  return (
    <LayoutTeacher title="Teacher's Dashboard">
      <UserInformation />
      {/* <div className="row mt-2">
        <div className="col-lg-3 col-sm-12 col-xs-12">
          <TeachersLeftMenu />
        </div>
        <div className="col-lg-9 col-sm-12 col-xs-12">
        </div>
      </div> */}
    </LayoutTeacher>
  );
}

export default TeachersDashboard;
