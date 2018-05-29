import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import InsideBanner from '../components/InsideBanner';
import AgentListItem from '../components/AgentListItem';

class AgentsContainer extends PureComponent {
  render() {
    const { agentsList } = this.props;
    if (!agentsList) {
      return null;
    }

    return (
      <main className="agents">
        <InsideBanner />
        <section className="container">
          <div className="spacer agents">
            {agentsList.map(agent =>
              <AgentListItem key={agent.get('id')} agent={agent} />)
            }
          </div>
        </section>
      </main>
    );
  }
}

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

const functions = {};

export default connect(mapStateToProps, functions)(AgentsContainer);
