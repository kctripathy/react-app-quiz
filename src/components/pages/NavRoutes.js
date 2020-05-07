import React from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "../auth/PrivateRoute";
import AdminRoute from "../auth/AdminRoute";
import TeacherRoute from "../auth/TeacherRoute";
import StudentRoute from "../auth/StudentRoute";
import SuperAdminRoute from "../auth/SuperAdminRoute";

import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

import QuizApp from "../quiz/QuizApp";

import Login from "../user/Login";
import UserRegistration from "../user/UserRegistration";
import QuizResults from "../user/QuizResults";
import Profile from "../user/Profile";
import ChangePassword from "../user/ChangePassword";
import ForgotPassword from "../user/ForgotPassword";
import ResetPassword from "../user/ResetPassword";

import UserDashboard from "../user/UserDashboard";
import StudentsDashboard from "../student/StudentsDashboard";
import TeachersDashboard from "../teacher/TeachersDashboard";
import AdminDashboard from "../admin/AdminDashboard";
import SuperAdminDashboard from "../admin/SuperAdminDashboard";

import QuestionAdd from "../admin/QuestionAdd";
import QuestionList from "../admin/QuestionList";
import QuestionEdit from "../admin/QuestionEdit";

import UserAdd from "../admin/UserAdd";
import UserEdit from "../admin/UserEdit";
import UserList from "../admin/UserList";

import AccountAdd from "../admin/AccountAdd";
import AccountEdit from "../admin/AccountEdit";
import AccountGrid from "../admin/AccountGrid";

import PageNotFound from "../pages/PageNotFound";
import TeachersProfile from "../teacher/TeachersProfile";
import StudentsProfile from "../student/StudentsProfile";

import StudentsExamination from "../student/StudentsExamination";
import StudentsExamCalendar from "../student/StudentsExamCalendar";
import StudentsPerformance from "../student/StudentsPerformance";
import StudentsPersonal from "../student/StudentsPersonal";

import TeachersExamCalendar from "../teacher/TeachersExamCalendar";
import TeachersExamMaker from "../teacher/TeachersExamMaker";
import TeachersExamReview from "../teacher/TeachersExamReview";
import TeachersPerformance from "../teacher/TeachersPerformance";

import ClassesManagement from "../admin/ClassesManagement";
import SubjectsManagement from "../admin/SubjectsManagement";
import ClassSubjectsManagement from "../admin/ClassSubjectsManagement";
import AdminProfile from "../admin/AdminProfile";
import SuperAdminProfile from "../admin/SuperAdminProfile";

function NavRoutes() {
  return (
    <div>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/quiz" component={QuizApp} />

        <Route path="/login" component={Login} />
        <Route path="/register" component={UserRegistration} />
        <Route path="/contact" component={Contact} />
        <Route path="/user/forgot-password" component={ForgotPassword} exact />
        <Route path="/user/change-password" component={ChangePassword} exact />
        <Route
          path="/user/reset-password/:authKey"
          component={ResetPassword}
          exact
        />

        <StudentRoute
          path="/student/profile"
          component={StudentsProfile}
          exact
        />
        <StudentRoute
          path="/student/exam-calendar"
          component={StudentsExamCalendar}
          exact
        />
        <StudentRoute
          path="/student/examination"
          component={StudentsExamination}
          exact
        />

        <StudentRoute
          path="/student/performance"
          component={StudentsPerformance}
          exact
        />

        <StudentRoute
          path="/student/personal"
          component={StudentsPersonal}
          exact
        />
        <AdminRoute path="/admin/dashboard" component={AdminDashboard} exact />

        <TeacherRoute
          path="/teacher/profile"
          component={TeachersProfile}
          exact
        />
        <TeacherRoute path="/question/add" component={QuestionAdd} exact />
        <TeacherRoute path="/questions/list" component={QuestionList} exact />
        <TeacherRoute
          path="/question/edit/:questionId"
          component={QuestionEdit}
          exact
        />

        <TeacherRoute
          path="/teacher/exam-calendar"
          component={TeachersExamCalendar}
          exact
        />
        <TeacherRoute
          path="/teacher/exam-maker"
          component={TeachersExamMaker}
          exact
        />
        <TeacherRoute
          path="/teacher/exam-review"
          component={TeachersExamReview}
          exact
        />
        <TeacherRoute
          path="/teacher/performance"
          component={TeachersPerformance}
          exact
        />

        <AdminRoute path="/user/list" component={UserList} exact />
        <AdminRoute path="/user/add" component={UserAdd} exact />
        <AdminRoute path="/user/edit/:userId" component={UserEdit} exact />

        <AdminRoute
          path="/subjects/list"
          component={ClassSubjectsManagement}
          exact
        />

        <PrivateRoute
          path="/student/dashboard"
          component={StudentsDashboard}
          exact
        />
        <TeacherRoute
          path="/teacher/dashboard"
          component={TeachersDashboard}
          exact
        />
        <PrivateRoute path="/user/dashboard" component={UserDashboard} exact />
        <PrivateRoute path="/user/quiz/results" component={QuizResults} exact />
        <PrivateRoute path="/user/profile" component={Profile} exact />

        <AdminRoute path="/admin/profile" component={AdminProfile} exact />
        <SuperAdminRoute
          path="/superAdmin/profile"
          component={SuperAdminProfile}
          exact
        />

        <SuperAdminRoute
          path="/SuperAdmin/dashboard"
          component={SuperAdminDashboard}
          exact
        />
        <SuperAdminRoute path="/account/add" component={AccountAdd} exact />
        <SuperAdminRoute
          path="/account/edit/:accountId"
          component={AccountEdit}
          exact
        />
        <SuperAdminRoute path="/account/list" component={AccountGrid} exact />

        <SuperAdminRoute path="/classes" component={ClassesManagement} exact />

        <SuperAdminRoute
          path="/subjects"
          component={SubjectsManagement}
          exact
        />

        <SuperAdminRoute
          path="/class-subjects"
          component={ClassSubjectsManagement}
          exact
        />

        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default NavRoutes;
