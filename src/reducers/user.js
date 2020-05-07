import { UserActionTypes } from "../constants/actionTypes";
import { Role } from "../constants";

let initialState = {
  users: [],
  count: {
    total: 0,
    admins: 0,
    teachers: 0,
    students: 0,
    users: 0,
  },
  loading: true,
  error: "",
  success: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.fetchUserSuccess:
      return {
        ...state,
        users: action.payload,
        count: {
          total: action.payload.length,
          admins: action.payload.reduce(
            (n, user) => n + (user.accessLevel === Role.Admin),
            0
          ),
          teachers: action.payload.reduce(
            (n, user) => n + (user.accessLevel === Role.Teacher),
            0
          ),
          students: action.payload.reduce(
            (n, user) => n + (user.accessLevel === Role.Student),
            0
          ),
          users: action.payload.reduce(
            (n, user) => n + (user.accessLevel === Role.User),
            0
          ),
        },
        loading: false,
      };
    case UserActionTypes.fetchUserFailure:
      return {
        ...state,
        users: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
