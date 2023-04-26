import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import authSelector from 'redux/auth-selector';
import styles from './MainNav.module.css';

const MainNav = ({ isAuthenticated }) => (
  <nav>
    <NavLink to="/" className={styles.phonebookLink}>
      Home
    </NavLink>
    {isAuthenticated && (
      <NavLink to="/contacts" className={styles.phonebookLink}>
        Contacts
      </NavLink>
    )}
  </nav>
);
const mapStateToProps = state => ({
  isAuthenticated: authSelector.getIsAuthenticated(state),
});

export default connect(mapStateToProps)(MainNav);
