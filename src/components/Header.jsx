import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ImmutablePropTypes from 'react-immutable-proptypes';

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  onClickLogout(event) {
    event.preventDefault();
    this.props.onLogout();
  }

  render() {
    const { match: { url }, userData } = this.props;
    return (
      <header>
        <div className="navbar-wrapper">
          <div className="navbar-inverse" role="navigation">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
              </div>
              <div className="navbar-collapse  collapse">
                { userData.size > 0 &&
                <div className="user-label">
                  Welcome <span className="name">{userData.get('name')}</span>
                </div>}
                <ul className="nav navbar-nav navbar-right">
                  <li className={url === '/' ? 'active' : ''}><Link className="link-home" to="/">Home</Link></li>
                  <li className={url === '/about' ? 'active' : ''}><Link className="link-about" to="/about">About</Link></li>
                  <li className={url === '/agents' ? 'active' : ''} ><Link className="link-agents" to="/agents">Agents</Link></li>
                  <li className={url === '/blog' ? 'active' : ''} ><Link className="link-blog" to="/blog">Blog</Link></li>
                  <li className={url === '/contact' ? 'active' : ''}><Link className="link-contact" to="/contact">Contact</Link></li>
                  { userData.size > 0 &&
                    <li className={`drop-down-menu ${url === '/my-account' ? 'active' : ''}`}>
                      <Link className="link-my-account" to="/my-account">My Account</Link>
                      <ul className="nav-level1">
                        <li><Link className="link-my-account" to="/my-account">My Details</Link></li>
                        <li><Link className="link-my-properties" to="/my-properties">My Properties</Link></li>
                        <li><Link className="link-logout" to="/logout" onClick={this.onClickLogout}>Logout</Link></li>
                      </ul>
                    </li>
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="header">
            <Link id="logo" to="/"><img src="/static/images/logo.png" alt="Realestate" /></Link>
            <ul className="pull-right">
              <li><Link to="/search" replace>Buy</Link></li>
              <li><a href="buysalerent.php">Sale</a></li>
              <li><a href="buysalerent.php">Rent</a></li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  userData: ImmutablePropTypes.contains({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Header;
