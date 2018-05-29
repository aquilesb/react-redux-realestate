import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class InsideBanner extends PureComponent {
  render() {
    return (
      <div className="inside-banner">
        <div className="container">
          <span className="pull-right">
            <Link to="/">Home</Link>
            / About Us
          </span>
          <h2>About Us</h2>
        </div>
      </div>
    );
  }
}

export default InsideBanner;
