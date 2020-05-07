import React, { useState } from "react";

function Layout(props) {
  return (
    <div className="container-fluid layout">
      <div className="row m-0 p-0">
        <div className="col-lg-1 col-md-2 col-sm-12"></div>
        <div className="col-lg-10 col-md-2 col-sm-12">
          <h2 className="page-title">
            {props.title ? props.title : ""}
            {props.showCount && (
              <span className="badge badge-primary m-2">
                {" "}
                {props.showCount}
              </span>
            )}
          </h2>
        </div>
        <div className="col-lg-1 col-md-2 col-sm-12"></div>
      </div>

      <div className="row m-0 p-0">
        <div className="col-lg-1 col-md-12 col-sm-12"></div>
        <div className="col-lg-10 col-md-12 col-sm-12 m-0 p-0">
          {props.children}
        </div>
        <div className="col-lg-1 col-md-12 col-sm-12"></div>
      </div>
    </div>
  );
}

export default Layout;
