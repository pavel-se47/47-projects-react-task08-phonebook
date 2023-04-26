import React from 'react';
import { connect } from 'react-redux';
import Navigation from '../../MainNav/MainNav';
import UserMenu from '../../UserMenu/UserMenu';
import AuthNav from '../../AuthNav/AuthNav';
import authSelector from 'redux/auth-selector';
import styles from './AppBar.module.css';

const AppBar = ({ isAuthenticated }) => (
  <header className={styles.phonebookHeader}>
    <Navigation />
    {isAuthenticated ? <UserMenu /> : <AuthNav />}
  </header>
);

const mapStateToProps = state => ({
  isAuthenticated: authSelector.getIsAuthenticated(state),
});

export default connect(mapStateToProps, null)(AppBar);
