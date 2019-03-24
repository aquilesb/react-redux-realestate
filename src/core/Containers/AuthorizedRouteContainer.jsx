import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { updateLoginModalIsOpen } from '@/modules/Layout/Store/layout.actions';
import MainSpinner from '../Components/MainSpinner';

const AuthorizedRoute = ({
  component: Component,
  pending,
  logged,
  pathname,
  needAuth,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (pending) {
          return <div className="main-spinner-wrapper"><MainSpinner /></div>;
        }

        if (typeof Component === 'object') {
          return (
            <React.Suspense fallback={ <div className="main-spinner-wrapper"><MainSpinner /></div> }>
              {logged && <Component {...props} />}
              {!logged && needAuth && <Redirect to={`/?redirect=${pathname}`} />}
              {!logged && !needAuth && <Component {...props} /> }
            </React.Suspense>
          );
        }

        if (logged) {
          return <Component {...props} />;
        }
        if (needAuth) {
          return <Redirect to={`/?redirect=${pathname}`} />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

const stateToProps = state => ({
  pending: state.getIn(['user', 'authPending']),
  logged: !!state.getIn(['user', 'data', 'id']),
  userData: state.getIn(['user', 'data']),
  pathname: encodeURIComponent(state.getIn(['router', 'location', 'pathname'])),
});

const functions = {
  openLoginModal: updateLoginModalIsOpen,
};

AuthorizedRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  pending: PropTypes.bool.isRequired,
  logged: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  needAuth: PropTypes.bool,
};

AuthorizedRoute.defaultProps = {
  needAuth: false,
};

export default connect(stateToProps, functions)(AuthorizedRoute);
