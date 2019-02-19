import React from 'react';
import Promise from 'promise-polyfill';
import { Map } from 'immutable';
import { PropTypes } from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import RenderField from './RenderField';

/**
 * Validate if the form fields values are correct
 * @param {Immutable.Map} values form fields values
 * @returns {Object} Errors by field
 */
const validate = (values, props) => {
  const errors = {};
  if (!values.get('fullName')) {
    errors.fullName = 'Required';
  } else if (values.get('fullName').length > 15) {
    errors.fullName = 'Must be 15 characters or less';
  }
  if (!values.get('email')) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
    errors.email = 'Invalid email address';
  }
  if (!props.initialValues) {
    if (!values.get('password')) {
      errors.password = 'Required';
    } else if (values.get('password').length < 8) {
      errors.password = 'Must be have between 8 and 15 characters';
    }
    if (values.get('confirmPassword') !== values.get('password')) {
      errors.confirmPassword = 'Must be equal to password';
    }
  } else if (values.get('password') || values.get('confirmPassword')) {
    if (values.get('password').length < 8) {
      errors.password = 'Must be have between 8 and 15 characters';
    }
    if (values.get('confirmPassword') !== values.get('password')) {
      errors.confirmPassword = 'Must be equal to password';
    }
  }
  if (!values.get('address')) {
    errors.address = 'Required';
  }
  return errors;
};

/**
 * Validate async the form fields values
 * if use async validation instead of submitValidation
 * @param {Immutable.Map} values form fields values
 */
const asyncValidate = values => new Promise((resolve, reject) => {
  if (values.get('email')) {
    return fetch(`/api/user/email/${values.get('email')}`)
      .then(resp => resp.json().then((json) => {
        if (resp.status !== 200) {
          reject(json);
        }
      }));
  }
  return null;
});

const UserRegisterForm = (props) => {
  const {
    onValidate,
    handleSubmit,
    initialValues,
    pristine,
    reset,
    submitting,
    invalid,
  } = props;

  return (
    <form className="col-lg-6 col-lg-offset-3 col-sm-6 col-sm-offset-3 col-xs-12 form" onSubmit={handleSubmit(onValidate)}>
      <Field
        name="name"
        component={RenderField}
        type="text"
        className="form-control"
        placeholder="Full Name"
      />
      <Field
        name="email"
        component={RenderField}
        type="email"
        className="form-control"
        placeholder="Enter Email"
      />
      <Field
        name="password"
        component={RenderField}
        type="password"
        className="form-control"
        placeholder="Password"
      />
      <Field
        name="confirmPassword"
        component={RenderField}
        type="password"
        className="form-control"
        placeholder="Confirm Password"
      />
      <Field
        name="address"
        component="textarea"
        className="form-control"
        placeholder="Address"
        rows="6"
      />
      <button type="submit" className="btn btn-success" disabled={(!initialValues && pristine) || submitting || invalid} name="Submit">Register</button>
      <button type="button" className="btn btn-success reset" disabled={(!initialValues && pristine) || submitting} onClick={reset}>Reset</button>
    </form>
  );
};

UserRegisterForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: ImmutablePropTypes.contains({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
  }),
};

UserRegisterForm.defaultProps = {
  initialValues: Map({}),
};

export default reduxForm({
  form: 'registerForm',
  validate,
  // if use async validation instead of submitValidation
  // asyncValidate,
  // asyncBlurFields: ['email'],
})(UserRegisterForm);
