import React from 'react';
import { fromJS } from 'immutable';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import PropertyHot from '../../src/components/PropertyHot';

Enzyme.configure({ adapter: new Adapter() });

describe('PropertyHot component', () => {
  let mountedComponent;
  let props;
  const getComponent = (isNew = false) => {
    if (!mountedComponent || isNew) {
      mountedComponent = mount(<MemoryRouter><PropertyHot {...props} /></MemoryRouter>);
    }
    return mountedComponent;
  };

  beforeAll(() => {
    props = {
      item: fromJS({
        encodedUrl: 'encoded URL',
        name: 'property hot',
        images: ['image1', 'image2'],
        price: 175,
      }),
    };
  });

  test('should load img-circle element', () => {
    const imgCircle = getComponent().find('.row div .img-circle');
    expect(imgCircle.length).toBeGreaterThan(0);
  });

  test('should load ĺink-name element', () => {
    const ĺinkName = getComponent().find('.row div h5 .link-name');
    expect(ĺinkName.length).toBeGreaterThan(0);
  });

  test('should load price element', () => {
    const price = getComponent().find('.row div .price');
    expect(price.length).toBeGreaterThan(0);
  });
});
