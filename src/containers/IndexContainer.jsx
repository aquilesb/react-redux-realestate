import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Routes from '../components/Routes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainSpinner from '../components/MainSpinner';

class IndexContainer extends PureComponent {
  render() {
    const { layoutLoaded } = this.props;
    const spinner = () => (!layoutLoaded && <MainSpinner />);

    const content = () =>
      (layoutLoaded &&
        <div id="content">
          <Route path="*" component={Header} />
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

    return (
      spinner() || content()
    );
  }
}

IndexContainer.propTypes = {
  layoutLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  layoutLoaded: state.getIn(['layout', 'layoutLoaded']),
});

const functions = {
};

export default withRouter(connect(mapStateToProps, functions)(IndexContainer));
