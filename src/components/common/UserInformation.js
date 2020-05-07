import React from "react";
import { isAuthenticated } from "../auth";

export default function UserInformation(props) {
  const { id, userEmail, fullname, accessLevel } = isAuthenticated();
  return (
    // <div className="card mb-5 p-2">
    <ul className="list-group">
      <li className="list-group-item  bg-info text-white">
        <h5>Profile:</h5>
        <span className="d-none">{`${accessLevel}'s Information : (${id})`}</span>
      </li>
      <li className="list-group-item">Name:&nbsp;&nbsp;{fullname}</li>
      <li className="list-group-item">Email:&nbsp;{userEmail}</li>
    </ul>
    // </div>
  );
}
