import React from "react";
import { useSelector } from "react-redux";

export default function UserSummary() {
  const state = useSelector((state) => state.user);
  console.log(state);
  return (
    <div className="card">
      <h1>UserSummary</h1>
    </div>
  );
}
