import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { updateLoginModalIsOpen } from '@/modules/Layout/Store/layout.actions';
import InsideBanner from '@/core/Components/InsideBanner';
import UserRegisterForm from '@/modules/User/Components/UserRegisterForm';
import { userRegisterValidate } from '@/modules/User/Store/user.actions';

const RegisterContainer = ({
  loginModalOpen,
  registerValidateAction,
  updateLoginModalAction,
}) => {
  useEffect(() => {
    if (loginModalOpen) {
      updateLoginModalAction(false)
    }
  });

  return (
    <main className="register">
      <InsideBanner title="Register" />
      <section className="container">
        <div className="row register">
          <UserRegisterForm onValidate={registerValidateAction} />
        </div>
      </section>
    </main>
  );
};

RegisterContainer.propTypes = {
  loginModalOpen: PropTypes.bool.isRequired,
  updateLoginModalAction: PropTypes.func.isRequired,
  registerValidateAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loginModalOpen: state.getIn(['layout', 'loginModalOpen']),
});

const functions = {
  updateLoginModalAction: updateLoginModalIsOpen,
  registerValidateAction: userRegisterValidate,
};

export default connect(mapStateToProps, functions)(RegisterContainer);
