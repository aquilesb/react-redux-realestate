import React from 'react';
import PropTypes from 'prop-types';

const AgentListItem = ({
  name,
  email,
  image,
  showEmail,
  phone,
  showPhone,
  description,
}) => (
  <div className="row">
    <div className="col-lg-8  col-lg-offset-2 col-sm-12">
      <div className="row">
        <div className="col-lg-2 col-sm-2 ">
          <a href="/">
            <img src={image} className="img-responsive" alt="agent name" />
          </a>
        </div>
        <div className="col-lg-7 col-sm-7">
          <h4 className="name">{name}</h4>
          <p className="description">{description}</p>
        </div>
        <div className="col-lg-3 col-sm-3 ">
          {showEmail && <span className="glyphicon glyphicon-envelope" /> }
          {showEmail && <a id="mail-2-agent" href="mailto:email">{email}</a>}
          <br />
          {showPhone && <span className="glyphicon glyphicon-earphone" />}
          {showPhone && <span className="phone">{phone}</span>}
        </div>
      </div>
    </div>
  </div>
);

AgentListItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  showEmail: PropTypes.bool.isRequired,
  phone: PropTypes.string.isRequired,
  showPhone: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
};

export default AgentListItem;
