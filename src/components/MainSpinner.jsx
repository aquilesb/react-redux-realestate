import React, { Component } from 'react';

class MainSpinner extends Component {
  render() {
    return (
      <div className="main-spinner-wrapper">
        <div className="spinner" >
          <div className="double-bounce1" />
          <div className="double-bounce2" />
        </div>
      </div>
    );
  }
}

export default MainSpinner;
