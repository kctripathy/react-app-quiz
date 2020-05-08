import React from "react";
import AdminLeftMenu from "../admin/AdminLeftMenu";
import UserLastLogin from "../common/UserLastLogin";
import { Role } from "../../constants";

function LayoutSuperAdmin(props) {
  return (
    <div className="container-fluid layout">
      <div className="row m-0 p-0">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <h2 className="page-title">
            {props.title ? props.title : ""}
            {props.showCount && (
              <span className="badge badge-primary m-2">
                {" "}
                {props.showCount}
              </span>
            )}
          </h2>
          <div className="float-right last-login">
            <UserLastLogin />
          </div>
        </div>
      </div>

      <div className="row m-0 p-0">
        <div className="col-lg-3 col-md-12 col-sm-12">
          <AdminLeftMenu accessLevel={Role.SuperAdmin} />
        </div>
        <div className="col-lg-9 col-md-12 col-sm-12">{props.children}</div>
      </div>
    </div>
  );
}

export default LayoutSuperAdmin;
