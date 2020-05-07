import React, { useState } from "react";
import Layout from "../pages/Layout";
import UsersLeftMenu from "./UsersLeftMenuitems";
import UserInformation from "../common/UserInformation";

function UserDashboard() {
  return (
    <Layout>
      <div className="row mt-2">
        <div className="col-lg-3 col-sm-12 col-xs-12">
          <UsersLeftMenu />
        </div>
        <div className="col-lg-9 col-sm-12 col-xs-12">
          <UserInformation />
        </div>
      </div>
    </Layout>
  );
}

export default UserDashboard;
