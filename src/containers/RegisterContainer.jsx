import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { updateLoginModalIsOpen } from '../actions/layoutActions';
import InsideBanner from '../components/InsideBanner';
import UserRegisterForm from '../components/UserRegisterForm';
import { userRegisterValidate } from '../actions/userActions';

class RegisterContainer extends PureComponent {
  componentDidMount() {
    if (this.props.loginModalOpen) {
      this.props.updateLoginModalIsOpen(false);
    }
  }

  render() {
    const { registerValidate } = this.props;
    return (
      <main className="register">
        <InsideBanner title="Register" />
        <section className="container">
          <div className="row register">
            <UserRegisterForm onValidate={registerValidate} />
          </div>
        </section>
      </main>
    );
  }
}

RegisterContainer.propTypes = {
  loginModalOpen: PropTypes.bool.isRequired,
  updateLoginModalIsOpen: PropTypes.func.isRequired,
  registerValidate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loginModalOpen: state.getIn(['layout', 'loginModalOpen']),
});

const functions = {
  updateLoginModalIsOpen,
  registerValidate: userRegisterValidate,
};

export default connect(mapStateToProps, functions)(RegisterContainer);
