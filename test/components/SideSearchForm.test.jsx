import React from 'react';
import { fromJS } from 'immutable';
import Enzyme, { mount } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import SideSearchForm from '../../src/components/SideSearchForm';

Enzyme.configure({ adapter: new Adapter() });

describe('SideSearchForm component', () => {
  let mountedComponent;
  let props;
  const getComponent = (isNew = false) => {
    if (!mountedComponent || isNew) {
      mountedComponent = mount(<MemoryRouter><SideSearchForm {...props} /></MemoryRouter>);
    }
    return mountedComponent;
  };

  beforeAll(() => {
    props = {
      searchPrice: '100 - 200',
      searchType: '1',
      searchProperty: '3',
      priceListItem: fromJS({
        type: '1',
        list: [
          '100 - 200',
          '200 - 300',
        ],
      }),
      onSearchProperty: jest.fn(),
      changeSearchField: jest.fn(),
    };
  });

  test('should load search-form element', () => {
    const mainContact = getComponent().find('.search-form');
    expect(mainContact.length).toBeGreaterThan(0);
  });

  test('should load type select element', () => {
    const type = getComponent().find('select.type');
    expect(type.length).toBeGreaterThan(0);
  });

  test('should trigger type onchange function', () => {
    const onSearchType = sinon.spy();
    props.changeSearchField = onSearchType;
    const type = getComponent(true).find('select.type');
    type.simulate('change', { target: { value: 'hello' } });
    expect(onSearchType).toHaveProperty('callCount', 1);
    expect(onSearchType.calledWith('type', 'hello')).toBe(true);
  });

  test('should load price select element', () => {
    const price = getComponent().find('select.price');
    expect(price.length).toBeGreaterThan(0);
  });

  test('should trigger price onchange function', () => {
    const onSearchPrice = sinon.spy();
    props.changeSearchField = onSearchPrice;
    const price = getComponent(true).find('select.price');
    price.simulate('change', { target: { value: 'hello' } });
    expect(onSearchPrice).toHaveProperty('callCount', 1);
    expect(onSearchPrice.calledWith('price', 'hello')).toBe(true);
  });

  test('should load property select element', () => {
    const property = getComponent().find('select.property');
    expect(property.length).toBeGreaterThan(0);
  });

  test('should trigger property onchange function', () => {
    const onSearchProperty = sinon.spy();
    props.changeSearchField = onSearchProperty;
    const property = getComponent(true).find('select.property');
    property.simulate('change', { target: { value: 'hello' } });
    expect(onSearchProperty).toHaveProperty('callCount', 1);
    expect(onSearchProperty.calledWith('property', 'hello')).toBe(true);
  });

  test('should load Find now button element', () => {
    const btn = getComponent(true).find('.btn-primary');
    expect(btn.length).toBeGreaterThan(0);
  });
});
