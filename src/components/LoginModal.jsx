import React, { Component } from 'react';

class LoginModal extends Component {
  render() {
    return (
      <section className="login-modal">
        <div className="sign-in-form">
          <h4>Login</h4>
          <input type="text" className="form-control email" placeholder="Enter Email" name="form_email" />
          <input type="password" className="form-control phone" placeholder="Password" name="form_phone" />
          <button type="submit" className="btn btn-success" name="Submit">Sign in</button>
        </div>
        <div className="sign-up">
          <h4>New User Sign Up</h4>
          <div>
            Join today and get updated with all the properties deal happening around.
          </div>
          <div><button className="btn btn-info">Join Now</button>
          </div>
        </div>
      </section>
    );
  }
}

export default LoginModal;
