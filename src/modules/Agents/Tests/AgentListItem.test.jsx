import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import AgentListItem from '../Components/AgentListItem';

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
      name: 'test name',
      image: '//my.domain.com/static/images/random-image.jpg',
      email: 'test@gmail.com',
      showEmail: true,
      phone: '+610426541236',
      showPhone: true,
      description: 'This is the descripition',
    };
  });

  describe('when showEmail and showPhone are true', () => {
    test('should load content', () => {
      const rowDiv = agentListItem().find('.row');
      expect(rowDiv.length).toBeGreaterThan(0);
    });

    test('should load name', () => {
      const name = agentListItem().find('.name');
      expect(name.length).toBeGreaterThan(0);
    });

    test('should load description', () => {
      const description = agentListItem().find('.description');
      expect(description.length).toBeGreaterThan(0);
    });

    test('should show envelope icon when showEmail props is true', () => {
      const envelope = agentListItem().find('.glyphicon-envelope');
      expect(envelope.length).toBeGreaterThan(0);
    });

    test('should show link to mail agent when showEmail props is true', () => {
      const linkMail = agentListItem().find('#mail-2-agent');
      expect(linkMail.length).toBeGreaterThan(0);
    });

    test('should show earphone icon when showPhone props is true', () => {
      const earphone = agentListItem().find('.glyphicon-earphone');
      expect(earphone.length).toBeGreaterThan(0);
    });

    test('should show phone agent when showPhone props is true', () => {
      const phone = agentListItem().find('.phone');
      expect(phone.length).toBeGreaterThan(0);
    });
  });

  describe('when showEmail and showPhone are false', () => {
    beforeAll(() => {
      props = {
        ...props,
        showEmail: false,
        showPhone: false,
      };
    });

    test('should not show envelope icon when showEmail props is false', () => {
      const envelope = agentListItem(true).find('.glyphicon-envelope');
      expect(envelope).toHaveLength(0);
    });

    test('should not show link to mail agent when showEmail props is false', () => {
      const linkMail = agentListItem().find('#mail-2-agent');
      expect(linkMail).toHaveLength(0);
    });

    test('should not show earphone icon when showPhone props is false', () => {
      const earphone = agentListItem().find('.glyphicon-earphone');
      expect(earphone).toHaveLength(0);
    });

    test('should not show phone agent when showPhone props is false', () => {
      const phone = agentListItem().find('.phone');
      expect(phone).toHaveLength(0);
    });
  });
});
