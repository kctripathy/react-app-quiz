import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from "./Home";
import About from "./About";
import Quiz from "../App";

import Login from "../user/Login";
import Register from "../user/Register";
import Contact from './Contact';

import Profile from "../user/Profile";

import PageNotFound from '../pages/PageNotFound';

import PrivateRoute from '../auth/PrivateRoute';
import AdminRoute from '../auth/AdminRoute';

function NavRoutes() {
    return (
        <div>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/home" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/quiz" component={Quiz} />

                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/contact" component={Contact} />
                
                <PrivateRoute path="/profile" component={Profile} />
                                
                <Route component={PageNotFound} />

            </Switch>             
        </div>
    );
}

export default NavRoutes;