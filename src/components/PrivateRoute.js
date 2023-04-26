import React from 'react';
import { connect } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import authSelector from 'redux/auth-selector';

function PrivateRoute({ authUser, redirectPath, children }) {
  if (!authUser) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
}

const mapStateToProps = state => ({
  authUser: authSelector.getIsAuthenticated(state),
});

export default connect(mapStateToProps)(PrivateRoute);
