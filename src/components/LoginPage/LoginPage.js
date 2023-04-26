import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import authOperations from 'redux/auth-operations';
import styles from './LoginPage.module.css';
import { ThreeDots } from 'react-loader-spinner';

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onLogin(this.state);

    this.setState({ name: '', email: '', password: '' });
  };

  render() {
    const { email, password } = this.state;

    return (
      <>
        <div className={styles.loading}>
          {this.props.isLoadingContacts && (
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="skyblue"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          )}
        </div>
        <div className={styles.login}>
          <form
            onSubmit={this.handleSubmit}
            className={styles.form}
            autoComplete="off"
          >
            <label className={styles.label}>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={this.handleChange}
              />
            </label>

            <label className={styles.label}>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={this.handleChange}
              />
            </label>
            <div className={styles.buttons}>
              <NavLink to="/">
                <button className={styles.button} type="button">
                  Home
                </button>
              </NavLink>

              <button className={styles.button} type="submit">
                LogIn
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = {
  onLogin: authOperations.loginUser,
};

export default connect(null, mapDispatchToProps)(LoginPage);
