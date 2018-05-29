import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

class AgentListItem extends PureComponent {
  render() {
    const { agent } = this.props;

    return (
      <div className="row">
        <div className="col-lg-8  col-lg-offset-2 col-sm-12">
          <div className="row">
            <div className="col-lg-2 col-sm-2 ">
              <a href="/">
                <img src={agent.get('image')} className="img-responsive" alt="agent name" />
              </a>
            </div>
            <div className="col-lg-7 col-sm-7">
              <h4 className="name">{agent.get('name')}</h4>
              <p className="description">{agent.get('description')}</p>
            </div>
            <div className="col-lg-3 col-sm-3 ">
              {agent.get('showEmail') && <span className="glyphicon glyphicon-envelope" /> }
              {agent.get('showEmail') && <a id="mail-2-agent" href={`mailto:${agent.get('email')}`}>{agent.get('email')}</a>}
              <br />
              {agent.get('showPhone') && <span className="glyphicon glyphicon-earphone" />}
              {agent.get('showPhone') && <span className="phone">{agent.get('phone')}</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AgentListItem.propTypes = {
  agent: ImmutablePropTypes.contains({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    showEmail: PropTypes.bool.isRequired,
    phone: PropTypes.string.isRequired,
    showPhone: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default AgentListItem;
