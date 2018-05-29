import { CALL_API } from 'redux-api-middleware';
import { fromJS } from 'immutable';
import { ajaxFailure } from '../utils/ajaxUtils';
import { onSearchProperty } from './propertieActions';

export const SEARCH_CHANGE_FIELD = 'SEARCH_CHANGE_FIELD';
export const SEARCH_CHANGE_SORT_BY = 'SEARCH_CHANGE_SORT_BY';
export const SEARCH_CHANGE_PARAMS = 'SEARCH_CHANGE_PARAMS';
export const SEARCH_RESET_PARAMS = 'SEARCH_RESET_PARAMS';

export const SEARCH_GET_PRICE_TYPE = 'SEARCH_GET_PRICE_TYPE';
export const SEARCH_GET_PRICE_TYPE_SUCCESS = 'SEARCH_GET_PRICE_TYPE_SUCCESS';
export const SEARCH_GET_PRICE_TYPE_FAILURE = 'SEARCH_GET_PRICE_TYPE_FAILURE';

export const changeSortBy = event => (dispatch) => {
  dispatch({ type: SEARCH_CHANGE_SORT_BY, sortBy: event.target.value });
  return dispatch(onSearchProperty());
};

export const updateSearchParams = totalResults => (dispatch, state) => {
  const reduxState = state();
  const timesSearched = reduxState.getIn(['search', 'timesSearched']);
  let totalLoaded = (timesSearched + 1) * reduxState.getIn(['search', 'qntSearch']);
  totalLoaded = totalLoaded > totalResults ? totalResults : totalLoaded;

  dispatch({
    type: SEARCH_CHANGE_PARAMS,
    timesSearched: timesSearched + 1,
    totalLoaded,
    totalResults,
  });
  return Promise.resolve();
};

export const resetSearchParams = () => ({ type: SEARCH_RESET_PARAMS });

export const changeSearchField = (field, value) => ({
  type: SEARCH_CHANGE_FIELD,
  field,
  value,
});

export const getPriceTypes = () => ({
  [CALL_API]: {
    types: [
      SEARCH_GET_PRICE_TYPE,
      {
        type: SEARCH_GET_PRICE_TYPE_SUCCESS,
        payload: (_, state, response) => response.json().then(json => fromJS(json)),
      },
      ajaxFailure(SEARCH_GET_PRICE_TYPE_FAILURE),
    ],
    endpoint: '/api/prices/list',
    method: 'GET',
  },
});
