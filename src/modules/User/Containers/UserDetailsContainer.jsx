import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import InsideBanner from '@/core/Components/InsideBanner';
import UserRegisterForm from '../Components/UserRegisterForm';
import { userRegisterValidate } from '../Store/user.actions';

const UserDetailsContainer = ({ registerValidation, userData }) => (
  <main className="my-account">
    <InsideBanner title="My Account" />
    <section className="container">
      <div className="spacer agents">
        <UserRegisterForm onValidate={registerValidation} initialValues={userData} />
      </div>
    </section>
  </main>
);

UserDetailsContainer.propTypes = {
  userData: ImmutablePropTypes.contains({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
  registerValidation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userData: state.getIn(['user', 'data']),
});

const functions = {
  registerValidation: userRegisterValidate,
};

export default connect(mapStateToProps, functions)(UserDetailsContainer);
