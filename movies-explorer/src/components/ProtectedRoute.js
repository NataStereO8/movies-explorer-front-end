import React from 'react';
import { Route, Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
    return (
        <Route exact path={props.path}>
        {
            () => props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" />
        }
        </Route>)
}

export default ProtectedRoute; 