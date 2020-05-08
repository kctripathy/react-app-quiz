import React from "react";
import { isAuthenticated } from "../auth";
export default function ProfileImage() {
  const user = isAuthenticated();
  return (
    <div className="card ml-2 bg-info">
      <div className="card-header d-none">
        <h5>Photo {user.id}</h5>
      </div>
    </div>
  );
}
