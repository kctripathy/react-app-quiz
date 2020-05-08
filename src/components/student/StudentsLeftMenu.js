import React from "react";
import UsersLeftMenu from "../common/UsersLeftMenu";
import MenuListItem from "../common/MenuListItem";

export default function StudentsLeftMenu(props) {
  const showLeftMenu = () => {
    return (
      <ul className="list-group">
        <MenuListItem tittle="" menuType="ProfileImage" />
        <MenuListItem title="Dashboard" destination="/student/dashboard" />
        <MenuListItem title="My Profile" destination="/student/profile" />
        <MenuListItem
          title="Exam Calendar"
          destination="/student/exam-calendar"
        />
        <MenuListItem title="Practice Questions" destination="/quiz" />
        <MenuListItem title="Examination" destination="/student/examination" />
        <MenuListItem title="Performance" destination="/student/performance" />
        <MenuListItem title="Personal" destination="/student/personal" />
        <UsersLeftMenu />
      </ul>
    );
  };

  return showLeftMenu();
}
