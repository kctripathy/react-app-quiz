import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import UsersLeftMenu from "../common/UsersLeftMenu";
import { Role } from "../../constants";
import MenuListItem from "../common/MenuListItem";

export default function AdminLeftMenu({ accessLevel }) {
  const superAdminLinks = () => (
    <ul className="list-group">
      <MenuListItem title="" menuType="Separator" />
      <MenuListItem title="Dashboard" destination="/superAdmin/dashboard" />
      <MenuListItem title="Profile" destination="/superAdmin/profile" />

      <MenuListItem title="Account Management" menuType="Separator" />
      <MenuListItem title="Add New Account" destination="/account/add" />
      <MenuListItem
        title="View / Manage Accounts"
        destination="/account/list"
      />

      <MenuListItem title="Class n Subjects Management" menuType="Separator" />
      <MenuListItem title="Manage Classes" destination="/classes" />
      <MenuListItem title="Manage Subjects" destination="/subjects" />
      <MenuListItem
        title="Manage Subjects of Classes"
        destination="/class-subjects"
      />
      <MenuListItem title="" menuType="Separator" />

      <UsersLeftMenu />
    </ul>
  );

  const adminLinks = () => (
    <ul className="list-group">
      <MenuListItem title="" menuType="Separator" />
      <MenuListItem title="Dashboard" destination="/admin/dashboard" />
      <MenuListItem title="Profile" destination="/admin/profile" />

      <MenuListItem title="User Management" menuType="Separator" />
      <MenuListItem title="Add New User" destination="/user/add" />
      <MenuListItem title="View / Manage User" destination="/user/list" />

      <MenuListItem title="Question Bank Management" menuType="Separator" />
      <MenuListItem title="Add New Question" destination="/question/add" />
      <MenuListItem
        title="View / Manage Questions"
        destination="/question/list"
      />
      <MenuListItem title="" menuType="Separator" />
      <UsersLeftMenu />
    </ul>
  );

  return accessLevel && accessLevel === Role.SuperAdmin
    ? superAdminLinks()
    : adminLinks();
}
