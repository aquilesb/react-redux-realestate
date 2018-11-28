import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class InsideBanner extends PureComponent {
  render() {
    const { title } = this.props;

    return (
      <div className="inside-banner">
        <div className="container">
          <span className="pull-right">
            <Link to="/">Home</Link>
            / {title}
          </span>
          <h2>{title}</h2>
        </div>
      </div>
    );
  }
}

InsideBanner.propTypes = {
  title: PropTypes.string.isRequired,
};

export default InsideBanner;
