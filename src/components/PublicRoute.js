import React from 'react';
import { connect } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import authSelector from 'redux/auth-selector';

function PublicRoute({ authUser, redirectPath, restricted, children }) {
  if (authUser && restricted) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
}

const mapStateToProps = state => ({
  authUser: authSelector.getIsAuthenticated(state),
});

export default connect(mapStateToProps)(PublicRoute);
