import { CALL_API } from 'redux-api-middleware';
import { fromJS } from 'immutable';
import { ajaxFailure } from '../utils/ajaxUtils';

export const USER_UPDATE_DATA = 'USER_UPDATE_DATA';
export const USER_FETCH_DATA = 'USER_FETCH_DATA';
export const USER_FETCH_DATA_SUCCESS = 'USER_FETCH_DATA_SUCCESS';
export const USER_FETCH_DATA_FAILURE = 'USER_FETCH_DATA_FAILURE';

export const getUserData = () => (dispatch, state) => {
  const userID = state().getIn(['user', 'id']);
  return dispatch({
    [CALL_API]: {
      types: [
        USER_FETCH_DATA,
        {
          type: USER_FETCH_DATA_SUCCESS,
          payload: (_, reduxState, response) => response.json().then(json => fromJS(json)),
        },
        ajaxFailure(USER_FETCH_DATA_FAILURE),
      ],
      endpoint: `/api/user/${userID}`,
      method: 'GET',
    },
  });
};
