import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import shallowWithStore from '../helpers/shallowWithStore';
import AgentsContainer from '../../src/containers/AgentsContainer';
import agentsList from '../mockData/agents.json';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore([]);


describe('AgentsContainer', () => {
  let mountedComponent;
  let store;
  const getComponent = (isNew = false) => {
    if (!mountedComponent || isNew) {
      mountedComponent = shallowWithStore(<AgentsContainer />, store);
    }
    return mountedComponent;
  };

  beforeAll(() => {
    const state = fromJS({
      agents: {
        list: agentsList,
      },
    });
    store = mockStore(state);
  });

  it('should render successfully providing store', () => {
    const component = getComponent().find('main.agents');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should render inside-banner element', () => {
    const component = getComponent().find('.inside-banner');
    expect(component.length).toBeGreaterThan(0);
  });

  it('should render AgentListItem itens', () => {
    const itens = getComponent().find('div.spacer .row');
    expect(itens).toHaveLength(12);
  });
});
