import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const userRole = localStorage.getItem('user_role'); 

  if (userRole !== 'admin') {

    return <Navigate to="/login" />;
  }


  return <Component {...rest} />;
};

export default PrivateRoute;
