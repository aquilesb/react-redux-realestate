import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

const LoginModal = props => (
  <section className="login-modal">
    <LoginForm onSubmit={props.login} />
    <div className="sign-up">
      <h4>New User Sign Up</h4>
      <div>
        Join today and get updated with all the properties deal happening around.
      </div>
      <div>
        <Link to="/register" className="btn btn-info">Join Now</Link>
      </div>
    </div>
  </section>
);

LoginModal.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginModal;
