import React from "react";
import UserSummaryCount from "../common/UserSummaryCount";

export default function StudentSummary() {
  return (
    <div className="row d-flex flex-columns flex-lg-row">
      <UserSummaryCount title="QUESTIONS" count={2198} color="success" />
      <UserSummaryCount title="ATTEMPTS" count={13} color="primary" />
      <UserSummaryCount title="DAYS TO EXAM" count={123} color="danger" />
      <UserSummaryCount title="PERFORMANCE %" count={70} color="warning" />
    </div>
  );
}
