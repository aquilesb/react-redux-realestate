import React from 'react';
import { PropTypes } from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import InsideBanner from '../components/InsideBanner';
import AgentListItem from '../components/AgentListItem';

const AgentsContainer = ({ agentsList }) => {
  if (!agentsList) {
    return null;
  }

  return (
    <main className="agents">
      <InsideBanner title="Agents" />
      <section className="container">
        <div className="spacer agents">
          {agentsList.map(agent =>
            (<AgentListItem
              key={agent.get('id')}
              name={agent.get('name')}
              email={agent.get('email')}
              image={agent.get('image')}
              showEmail={agent.get('showEmail')}
              phone={agent.get('phone')}
              showPhone={agent.get('showPhone')}
              description={agent.get('description')}
            />))
          }
        </div>
      </section>
    </main>
  );
};

AgentsContainer.propTypes = {
  agentsList: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    showEmail: PropTypes.bool.isRequired,
    phone: PropTypes.string.isRequired,
    showPhone: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = state => ({
  agentsList: state.getIn(['agents', 'list']),
});

export default connect(mapStateToProps)(AgentsContainer);
