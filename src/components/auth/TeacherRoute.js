import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";
import { Role } from "../../constants";

const TeacherRoute = ({ component: Component, ...rest }) => {
  const user = isAuthenticated();
  return (
    <Route
      {...rest}
      render={(props) =>
        user &&
        (user.accessLevel === Role.SuperAdmin ||
          user.accessLevel === Role.Admin ||
          user.accessLevel === Role.Teacher) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default TeacherRoute;
