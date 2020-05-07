import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";
import { Role } from "../../constants";

const StudentRoute = ({ component: Component, ...rest }) => {
  const user = isAuthenticated();
  return (
    <Route
      {...rest}
      render={(props) =>
        user &&
        (user.accessLevel === 1 || user.accessLevel === Role.Student) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default StudentRoute;
