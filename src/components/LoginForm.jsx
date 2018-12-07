import React from 'react';
import { PropTypes } from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import RenderField from './RenderField';

/**
 * Validate if the form fields values are correct
 * @param {Immutable.Map} values form fields values
 * @returns {Object} Errors by field
 */
const validate = (values) => {
  const errors = {};
  if (!values.get('email')) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
    errors.email = 'Invalid email address';
  }
  if (!values.get('password')) {
    errors.password = 'Required';
  } else if (values.get('password').length < 8) {
    errors.password = 'Must be have between 8 and 15 characters';
  }
  return errors;
};

const LoginForm = (props) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    invalid,
    error,
  } = props;

  return (
    <form className="sign-in-form form" onSubmit={handleSubmit}>
      <h4>Login</h4>
      <Field
        name="email"
        component={RenderField}
        type="email"
        className="form-control email"
        placeholder="Enter email"
      />
      <Field
        name="password"
        component={RenderField}
        type="password"
        className="form-control"
        placeholder="Password"
      />
      <button type="submit" className="btn btn-success" disabled={pristine || submitting || invalid} name="Submit">Sign in</button>
      {((!pristine && invalid) && error) && <strong>{error}</strong>}
    </form>
  );
};

LoginForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  error: null,
};

export default reduxForm({
  form: 'loginForm',
  validate,
})(LoginForm);
