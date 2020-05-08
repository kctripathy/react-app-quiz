import React from "react";
import { isAuthenticated } from "../auth";
import {
  defaultDateTimeLongFormat,
  defaultDateTimeFromNow,
} from "../common/CommonFunctions";
export default function UserLastLogin() {
  const user = isAuthenticated();

  return (
    <span>
      <small>
        Last Login ::&nbsp;&nbsp;
        <em>
          {`${defaultDateTimeLongFormat(
            user.lastLoginDate
          )} (${defaultDateTimeFromNow(user.lastLoginDate)})`}
        </em>
      </small>
    </span>
  );
}
