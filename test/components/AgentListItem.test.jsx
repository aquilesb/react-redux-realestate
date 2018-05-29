import React from 'react';
import { fromJS } from 'immutable';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import AgentListItem from '../../src/components/AgentListItem';

Enzyme.configure({ adapter: new Adapter() });

describe('AgentListItem component', () => {
  let props;
  let mountedAgentListItem;
  const agentListItem = (isNew = false) => {
    if (!mountedAgentListItem || isNew) {
      mountedAgentListItem = mount(<MemoryRouter><AgentListItem {...props} /></MemoryRouter>);
    }
    return mountedAgentListItem;
  };

  beforeAll(() => {
    props = {
      agent: fromJS({
        id: 2,
        name: 'test name',
        email: 'test@gmail.com',
        showEmail: true,
        phone: '+610426541236',
        showPhone: true,
        description: 'This is the descripition',
      }),
    };
  });

  describe('WHEN showEmail and showPhone are true', () => {
    test('SHOULD load content', () => {
      const rowDiv = agentListItem().find('.row');
      expect(rowDiv.length).toBeGreaterThan(0);
    });

    test('SHOULD load name', () => {
      const name = agentListItem().find('.name');
      expect(name.length).toBeGreaterThan(0);
    });

    test('SHOULD load description', () => {
      const description = agentListItem().find('.description');
      expect(description.length).toBeGreaterThan(0);
    });

    test('SHOULD show envelope icon WHEN showEmail props is true', () => {
      const envelope = agentListItem().find('.glyphicon-envelope');
      expect(envelope.length).toBeGreaterThan(0);
    });

    test('SHOULD show link to mail agent WHEN showEmail props is true', () => {
      const linkMail = agentListItem().find('#mail-2-agent');
      expect(linkMail.length).toBeGreaterThan(0);
    });

    test('SHOULD show earphone icon WHEN showPhone props is true', () => {
      const earphone = agentListItem().find('.glyphicon-earphone');
      expect(earphone.length).toBeGreaterThan(0);
    });

    test('SHOULD show phone agent WHEN showPhone props is true', () => {
      const phone = agentListItem().find('.phone');
      expect(phone.length).toBeGreaterThan(0);
    });
  });

  describe('WHEN showEmail and showPhone are false', () => {
    beforeAll(() => {
      props.agent = props.agent.set('showEmail', false).set('showPhone', false);
    });

    test('SHOULD not show envelope icon WHEN showEmail props is false', () => {
      const envelope = agentListItem(true).find('.glyphicon-envelope');
      expect(envelope).toHaveLength(0);
    });

    test('SHOULD not show link to mail agent WHEN showEmail props is false', () => {
      const linkMail = agentListItem().find('#mail-2-agent');
      expect(linkMail).toHaveLength(0);
    });

    test('SHOULD not show earphone icon WHEN showPhone props is false', () => {
      const earphone = agentListItem().find('.glyphicon-earphone');
      expect(earphone).toHaveLength(0);
    });

    test('SHOULD not show phone agent WHEN showPhone props is false', () => {
      const phone = agentListItem().find('.phone');
      expect(phone).toHaveLength(0);
    });
  });
});
