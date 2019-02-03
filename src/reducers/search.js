import { fromJS } from 'immutable';
import * as ActionTypes from '../actions/actionTypes';

const initialState = fromJS({
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

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SEARCH_CHANGE_FIELD:
      return state.setIn(['fields', action.field], action.value);

    case ActionTypes.SEARCH_GET_PRICE_TYPE_SUCCESS:
      return state.set('priceTypes', action.payload);

    case ActionTypes.SEARCH_CHANGE_SORT_BY:
      return state.set('sortBy', parseInt(action.sortBy, 10));

    case ActionTypes.SEARCH_CHANGE_PARAMS:
      return state.set('timesSearched', action.timesSearched).set('totalLoaded', action.totalLoaded).set('totalResults', action.totalResults);

    case ActionTypes.SEARCH_RESET_PARAMS:
      return state.set('timesSearched', 0).set('totalLoaded', 0).set('totalResults', 0);

    default: return state;
  }
};
