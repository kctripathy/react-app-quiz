export const Role = {
  SuperAdmin: 1,
  Admin: 10,
  Teacher: 20,
  Student: 30,
  User: 100,
};

export const getRoleDescription = (accessLevel) => {
  let roleDesc;
  if (accessLevel) {
    if (accessLevel === Role.SuperAdmin) roleDesc = "superAdmin";
    else if (accessLevel === Role.Admin) roleDesc = "admin";
    else if (accessLevel === Role.Teacher) roleDesc = "teacher";
    else if (accessLevel === Role.Student) roleDesc = "student";
    else roleDesc = "user";
  }
  return roleDesc;
};
