import { fromJS } from 'immutable';
import reducer from '../../src/reducers/search';
import * as action from '../../src/actions/searchActions';

describe('search reducer', () => {
  let state;

  beforeAll(() => {
    state = fromJS({
      fields: {
        property: '',
        type: '1',
        price: '',
      },
      priceTypes: [],
      sortBy: 1,
      totalResults: 0,
      totalLoaded: 0,
      qntSearch: 10,
      timesSearched: 0,
    });
  });

  test('should returns search initial state', () => {
    expect(reducer(undefined, {})).toEqual(state);
  });

  test('should returns search type field updated', () => {
    const dispatchedAction = {
      type: action.SEARCH_CHANGE_FIELD,
      field: 'type',
      value: '2',
    };

    const newState = state.setIn(['fields', 'type'], '2');
    expect(reducer(undefined, dispatchedAction)).toEqual(newState);
  });

  test('should returns search property field updated', () => {
    const dispatchedAction = {
      type: action.SEARCH_CHANGE_FIELD,
      field: 'property',
      value: '1',
    };

    const newState = state.setIn(['fields', 'property'], '1');
    expect(reducer(undefined, dispatchedAction)).toEqual(newState);
  });

  test('should returns search price field updated', () => {
    const dispatchedAction = {
      type: action.SEARCH_CHANGE_FIELD,
      field: 'price',
      value: '100 - 200',
    };

    const newState = state.setIn(['fields', 'price'], '100 - 200');
    expect(reducer(undefined, dispatchedAction)).toEqual(newState);
  });

  test('should returns priceTypes updated', () => {
    const priceTypes = ['100 - 200', '200 - 300'];
    const dispatchedAction = {
      type: action.SEARCH_GET_PRICE_TYPE_SUCCESS,
      payload: priceTypes,
    };

    const newState = state.set('priceTypes', priceTypes);
    expect(reducer(undefined, dispatchedAction)).toEqual(newState);
  });

  test('should returns sortBy updated', () => {
    const dispatchedAction = {
      type: action.SEARCH_CHANGE_SORT_BY,
      sortBy: '2',
    };

    const newState = state.set('sortBy', 2);
    expect(reducer(undefined, dispatchedAction)).toEqual(newState);
  });

  test('should returns timesSearched updated', () => {
    const timesSearched = 2;
    const totalLoaded = 10;
    const totalResults = 30;
    const dispatchedAction = {
      type: action.SEARCH_CHANGE_PARAMS,
      timesSearched,
      totalLoaded,
      totalResults,
    };

    const newState = state.set('timesSearched', timesSearched).set('totalLoaded', totalLoaded).set('totalResults', totalResults);
    expect(reducer(undefined, dispatchedAction)).toEqual(newState);
  });

  test('should reset search parameters', () => {
    const dispatchedAction = {
      type: action.SEARCH_RESET_PARAMS,
    };

    const newState = state.set('timesSearched', 0).set('totalLoaded', 0).set('totalResults', 0);
    expect(reducer(undefined, dispatchedAction)).toEqual(newState);
  });
});
