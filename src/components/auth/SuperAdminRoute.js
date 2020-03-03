import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated, isAdmin } from './index'

const SuperAdminRoute = ({ component: Component, ...rest }) => {
    const user = isAuthenticated();
    return (
        <Route {...rest} render={props => user && user.accessLevel === 1 ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        } />
    )
};

export default SuperAdminRoute;