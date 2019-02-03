import { fromJS } from 'immutable';
import reducer from '../../src/reducers/properties';
import * as action from '../../src/actions/actionTypes';

describe('property reducer', () => {
  let initialState;

  beforeAll(() => {
    initialState = fromJS({
      featured: [],
      searched: [],
      hot: [],
      recommended: [],
    });
  });

  test('should returns property initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('should returns property state with featured list updated', () => {
    const payload = fromJS(['test']);
    const dispatchedAction = {
      type: action.PROPERTIES_GET_FEATURED_PROP_SUCCESS,
      payload,
    };
    const state = initialState.set('featured', payload);
    expect(reducer(undefined, dispatchedAction)).toEqual(state);
  });

  test('should returns property state with searched list reseted', () => {
    const payload = fromJS([]);
    const dispatchedAction = {
      type: action.PROPERTIES_RESET_SEARCH,
    };
    const state = initialState.set('searched', payload);
    expect(reducer(undefined, dispatchedAction)).toEqual(state);
  });

  test('should returns property state with recommended list updated', () => {
    const payload = fromJS(['test']);
    const dispatchedAction = {
      type: action.PROPERTIES_GET_RECOMMENDED_SUCCESS,
      payload,
    };
    const state = initialState.set('recommended', payload);
    expect(reducer(undefined, dispatchedAction)).toEqual(state);
  });

  test('should returns property state with hot list updated', () => {
    const payload = fromJS(['test']);
    const dispatchedAction = {
      type: action.PROPERTIES_GET_HOT_SUCCESS,
      payload,
    };
    const state = initialState.set('hot', payload);
    expect(reducer(undefined, dispatchedAction)).toEqual(state);
  });

  test('should returns property state with searched list updated', () => {
    const payload = fromJS(['test']);
    const initialList = fromJS(['initial']);
    const dispatchedAction = {
      type: action.PROPERTIES_SEARCH_SUCCESS,
      payload,
    };

    const state = initialState.set('searched', initialList.concat(payload));
    initialState = initialState.set('searched', initialList);
    expect(reducer(initialState, dispatchedAction)).toEqual(state);
  });
});
