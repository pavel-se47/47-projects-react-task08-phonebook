import React from 'react';
import { connect } from 'react-redux';
import defaultAvatar from './default-avatar.png';
import authSelector from 'redux/auth-selector';
import authOperations from 'redux/auth-operations';
import styles from './UserMenu.module.css';

const UserMenu = ({ avatar, name, onLogout }) => (
  <div className={styles.phonebookContainer}>
    <img src={avatar} alt="avatar" width="32" className={styles.userAvatar} />
    <span className={styles.userName}>Welcome, {name}</span>
    <button className={styles.button} type="button" onClick={onLogout}>
      LogOut
    </button>
  </div>
);

const mapStateToProps = state => ({
  name: authSelector.getUserName(state),
  avatar: defaultAvatar,
});

const mapDispatchToProps = {
  onLogout: authOperations.logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
