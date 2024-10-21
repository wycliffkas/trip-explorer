// src/components/PrivateRoute.js
import React from 'react';
import {Navigate} from 'react-router-dom';

const PrivateRoute = ({isLoggedIn, children}) => {
    return isLoggedIn ? children : <Navigate to="/login"/>;
};

export default PrivateRoute; // Ensure it's a default export
