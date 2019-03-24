import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Header from '@/modules/Layout/Components/Header';
import Footer from '@/modules/Layout/Components/Footer';
import { logout } from '@/modules/User/Store/user.actions';
import Routes from '../Components/Routes';
import MainSpinner from '../Components/MainSpinner';

const content = (userData, logoutAction) => (
  <div id="content">
    <Route path="*" component={props => <Header {...props} userData={userData} onLogout={logoutAction} />} />
    <Routes />
    <Footer />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
  </div>);

const IndexContainer = ({
  layoutLoaded,
  userData,
  logoutAction,
}) => (layoutLoaded ?
  content(userData, logoutAction) :
  <MainSpinner />
);

IndexContainer.propTypes = {
  layoutLoaded: PropTypes.bool.isRequired,
  userData: ImmutablePropTypes.contains({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
  }),
  logoutAction: PropTypes.func.isRequired,
};

IndexContainer.defaultProps = {
  userData: null,
};

const mapStateToProps = state => ({
  layoutLoaded: state.getIn(['layout', 'layoutLoaded']),
  userData: state.getIn(['user', 'data']),
});

const functions = {
  logoutAction: logout,
};

export default withRouter(connect(mapStateToProps, functions)(IndexContainer));
