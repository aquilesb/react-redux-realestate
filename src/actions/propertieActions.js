import { CALL_API } from 'redux-api-middleware';
import { fromJS } from 'immutable';
import queryString from 'query-string';
import { push } from 'connected-react-router';
import { updateSearchParams, resetSearchParams } from './searchActions';
import { ajaxFailure } from '../utils/ajaxUtils';

export const PROPERTIES_RESET_SEARCH = 'PROPERTIES_RESET_SEARCH';

export const PROPERTIES_GET_FEATURED_PROP = 'PROPERTIES_GET_FEATURED_PROP';
export const PROPERTIES_GET_FEATURED_PROP_SUCCESS = 'PROPERTIES_GET_FEATURED_PROP_SUCCESS';
export const PROPERTIES_GET_FEATURED_PROP_FAILURE = 'PROPERTIES_GET_FEATURED_PROP_FAILURE';

export const PROPERTIES_GET_RECOMMENDED = 'PROPERTIES_GET_RECOMMENDED';
export const PROPERTIES_GET_RECOMMENDED_SUCCESS = 'PROPERTIES_GET_RECOMMENDED_SUCCESS';
export const PROPERTIES_GET_RECOMMENDED_FAILURE = 'PROPERTIES_GET_RECOMMENDED_FAILURE';

export const PROPERTIES_GET_HOT = 'PROPERTIES_GET_HOT';
export const PROPERTIES_GET_HOT_SUCCESS = 'PROPERTIES_GET_HOT_SUCCESS';
export const PROPERTIES_GET_HOT_FAILURE = 'PROPERTIES_GET_HOT_FAILURE';

export const PROPERTIES_GET_NEW = 'PROPERTIES_GET_NEW';
export const PROPERTIES_GET_NEW_SUCCESS = 'PROPERTIES_GET_NEW_SUCCESS';
export const PROPERTIES_GET_NEW_FAILURE = 'PROPERTIES_GET_NEW_FAILURE';

export const PROPERTIES_SEARCH = 'PROPERTIES_SEARCH';
export const PROPERTIES_SEARCH_SUCCESS = 'PROPERTIES_SEARCH_SUCCESS';
export const PROPERTIES_SEARCH_FAILURE = 'PROPERTIES_SEARCH_FAILURE';

export const resetSearch = () => ({ type: PROPERTIES_RESET_SEARCH });

export const getFeaturedProps = () => ({
  [CALL_API]: {
    types: [
      PROPERTIES_GET_FEATURED_PROP,
      {
        type: PROPERTIES_GET_FEATURED_PROP_SUCCESS,
        payload: (_, state, response) => response.json().then(json => fromJS(json)),
      },
      ajaxFailure(PROPERTIES_GET_FEATURED_PROP_FAILURE),
    ],
    endpoint: '/api/properties/featured',
    method: 'GET',
  },
});

export const getRecommendedProps = () => ({
  [CALL_API]: {
    types: [
      PROPERTIES_GET_RECOMMENDED,
      {
        type: PROPERTIES_GET_RECOMMENDED_SUCCESS,
        payload: (_, state, response) => response.json().then(json => fromJS(json).slice(0, 4)),
      },
      ajaxFailure(PROPERTIES_GET_RECOMMENDED_FAILURE),
    ],
    endpoint: '/api/properties/recommended',
    method: 'GET',
  },
});

export const getHotProps = () => ({
  [CALL_API]: {
    types: [
      PROPERTIES_GET_HOT,
      {
        type: PROPERTIES_GET_HOT_SUCCESS,
        payload: (_, state, response) => response.json().then(json => fromJS(json).slice(0, 4)),
      },
      ajaxFailure(PROPERTIES_GET_HOT_FAILURE),
    ],
    endpoint: '/api/properties/hot',
    method: 'GET',
  },
});

export const getNewProps = () => ({
  [CALL_API]: {
    types: [
      PROPERTIES_GET_NEW,
      {
        type: PROPERTIES_GET_NEW_SUCCESS,
        payload: (_, state, response) => response.json().then(json => fromJS(json).slice(0, 4)),
      },
      ajaxFailure(PROPERTIES_GET_NEW_FAILURE),
    ],
    endpoint: '/api/properties/new',
    method: 'GET',
  },
});

const doSearch = params => dispatch =>
  dispatch({
    [CALL_API]: {
      types: [
        PROPERTIES_SEARCH,
        {
          type: PROPERTIES_SEARCH_SUCCESS,
          payload: (_, reduxState, response) =>
            response.json().then((json) => {
              dispatch(updateSearchParams(json.total));

              if (reduxState.getIn(['router', 'location', 'pathname']).indexOf('/search') === -1) {
                dispatch(push('/search'));
              }

              return fromJS(json.data);
            }),
        },
        ajaxFailure(PROPERTIES_SEARCH_FAILURE),
      ],
      endpoint: `/api/search/?${queryString.stringify(params)}`,
      method: 'GET',
    },
  });

export const doInifiteSearch = () => (dispatch, reduxState) => {
  const state = reduxState();
  const params = state.getIn(['search', 'fields']).set('qnt', state.getIn(['search', 'qntSearch'])).set('index', state.getIn(['search', 'timesSearched'])).set('sortBy', state.getIn(['search', 'sortBy']))
    .toJS();
  return dispatch(doSearch(params));
};

export const onSearchProperty = event => (dispatch, reduxState) => {
  if (event) {
    event.preventDefault();
  }
  const state = reduxState();
  const params = state.getIn(['search', 'fields']).set('qnt', state.getIn(['search', 'qntSearch'])).set('sortBy', state.getIn(['search', 'sortBy'])).set('index', 0)
    .toJS();

  dispatch(resetSearch());
  dispatch(resetSearchParams());
  return dispatch(doSearch(params));
};
