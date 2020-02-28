import React from 'react';
import { Route, Switch } from 'react-router-dom';


import PrivateRoute from '../auth/PrivateRoute';
import AdminRoute from '../auth/AdminRoute';

import Home from "./Home";
import About from "./About";
import Contact from './Contact';

import QuizApp from "../quiz/QuizApp";

import Login from "../user/Login";
import Register from "../user/Register";
import QuizResults from "../user/QuizResults";

import Profile from "../user/Profile";
import UserDashboard from '../user/UserDashboard';

import PageNotFound from '../pages/PageNotFound';

import AdminDashboard from '../admin/AdminDashboard';
import QuestionAdd from '../admin/QuestionAdd';
import QuestionList from '../admin/QuestionList';
import QuestionEdit from '../admin/QuestionEdit';

function NavRoutes() {
    return (
        <div>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/home" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/quiz" component={QuizApp} />

                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/contact" component={Contact} />

                <AdminRoute path="/admin/dashboard" component={AdminDashboard} exact />
                <AdminRoute path="/question/add" component={QuestionAdd} exact />
                <AdminRoute path="/questions/list" component={QuestionList} exact />
                <AdminRoute path="/question/edit/:questionId" component={QuestionEdit} exact />

                <PrivateRoute path="/user/dashboard" component={UserDashboard} exact />
                <PrivateRoute path="/user/quiz/results" component={QuizResults} exact />
                <PrivateRoute path="/user/profile" component={Profile} exact />


                <Route component={PageNotFound} />

            </Switch>
        </div>
    );
}

export default NavRoutes;