import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../constants/actionMethods";
import UserSummaryCount from "./UserSummaryCount";

export default function UserSummary() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="row m-0 p-2 d-flex flex-lg-row flex-sm-column border-dark">
      <div className="col-12 text-left">
        <h4>
          TOTAL USERS: <span className="text-primary">{state.count.total}</span>
        </h4>
      </div>
      <div className="col-12 m-0 p-0 d-flex flex-lg-row flex-column">
        <UserSummaryCount
          title="TEACHERS"
          count={state.count.teachers}
          color="success"
        />
        <UserSummaryCount
          title="STUDENTS"
          count={state.count.students}
          color="info"
        />
        <UserSummaryCount
          title="USERS"
          count={state.count.users}
          color="warning"
        />
        <UserSummaryCount
          title="ADMINS"
          count={state.count.admins}
          color="danger"
        />
      </div>
    </div>
  );
}
