import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer>
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-sm-3">
          <h4>Information</h4>
          <ul className="row page-links">
            <li className="col-lg-12 col-sm-12 col-xs-3"><Link to="/about">About</Link></li>
            <li className="col-lg-12 col-sm-12 col-xs-3"><Link to="/agents">Agents</Link></li>
            <li className="col-lg-12 col-sm-12 col-xs-3"><Link to="/blog">Blog</Link></li>
            <li className="col-lg-12 col-sm-12 col-xs-3"><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="col-lg-3 col-sm-3 newsletter-wrapper">
          <h4>Newsletter</h4>
          <p>Get notified about the latest properties in our marketplace.</p>
          <form className="form-inline">
            <input type="text" placeholder="Enter Your email address" className="form-control" />
            <button className="btn btn-success" type="button">Notify Me!</button>
          </form>
        </div>
        <div className="col-lg-3 col-sm-3 follow-us">
          <h4>Follow us</h4>
          <a className="social-link" href="/"><img src="/static/images/facebook.png" alt="facebook" /></a>
          <a className="social-link" href="/"><img src="/static/images/twitter.png" alt="twitter" /></a>
          <a className="social-link" href="/"><img src="/static/images/linkedin.png" alt="linkedin" /></a>
          <a className="social-link" href="/"><img src="/static/images/instagram.png" alt="instagram" /></a>
        </div>
        <div className="col-lg-3 col-sm-3 contact-us">
          <h4>Contact us</h4>
          <p>
            <b>Bootstrap Realestate Inc.</b>
            <br />
            <span className="glyphicon glyphicon-map-marker" /> 8290 Walk Street, Australia
            <br />
            <span className="glyphicon glyphicon-envelope" /> hello@bootstrapreal.com
            <br />
            <span className="glyphicon glyphicon-earphone" /> (123) 456-7890
          </p>
        </div>
      </div>
      <p className="copyright">Copyright 2013. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
