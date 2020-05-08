import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../constants/actionMethods";
import UserSummaryCount from "./UserSummaryCount";

export default function QuestionSummary() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <Fragment>
      <h5 className="page-title">Summary: </h5>
      <div className="row d-flex flex-columns flex-lg-rows border-dark m-0 p-0">
        <UserSummaryCount
          title="STUDENTS"
          count={state.count.students}
          color="info"
        />
        <UserSummaryCount
          title="TEACHERS"
          count={state.count.teachers}
          color="warning"
        />
        <UserSummaryCount title="QUESTIONS" count={767} color="success" />
        <UserSummaryCount title="TO EVALUATE" count={7} color="primary" />
      </div>
      <h5 className="page-title">QUESTIONS: </h5>
      <div className="row d-flex flex-columns flex-lg-rows border-dark m-0 p-0">
        <UserSummaryCount title="HISTORY" count={57} color="primary" />
        <UserSummaryCount title="POL. SCIENCE" count={157} color="danger" />
        <UserSummaryCount title="LOGIC" count={67} color="secondary" />
        <UserSummaryCount title="ECONOMICS" count={23} color="warning" />
      </div>
    </Fragment>
  );
}
