import { push } from 'connected-react-router';
import { CALL_API } from 'redux-api-middleware';
import { fromJS } from 'immutable';
import { fetch as fetchPolyfill } from 'whatwg-fetch';
import { SubmissionError } from 'redux-form/immutable';
import ls from 'local-storage';
import { ajaxFailure, ajaxFormFailure, getFetchOptions } from '../utils/ajaxUtils';
import { success } from '../utils/toastUtils';
import { updateLoginModalIsOpen } from './layoutActions';
import {
  USER_FETCH_DATA,
  USER_FETCH_DATA_SUCCESS,
  USER_FETCH_DATA_FAILURE,
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from './actionTypes';


const { ACCESS_TOKEN_KEY, USER_ID_KEY } = process.env;

/**
 * Load user data from backend
 * @param {string} storedID user ID stored on local storage
 */
export const getUserData = storedID => (dispatch, state) => {
  const userID = storedID || state().getIn(['user', 'id']);
  return dispatch({
    [CALL_API]: {
      types: [
        USER_FETCH_DATA,
        {
          type: USER_FETCH_DATA_SUCCESS,
          payload: (_, reduxState, response) => response.json().then((json) => {
            setTimeout(() => {
              dispatch(push('/my-account'));
            }, 500);
            return fromJS(json);
          }),
        },
        ajaxFailure(USER_FETCH_DATA_FAILURE),
      ],
      endpoint: `/api/user/${userID}`,
      method: 'GET',
    },
  });
};

/**
 * Register a new user in the backend
 * @param {object} compProps  component poperties (redux-form props)
 */
export const registerUser = compProps => (dispatch, state) => {
  let formValues = state().getIn(['form', 'registerForm', 'values']);
  if (compProps.initialValues) {
    formValues = compProps.initialValues.merge(formValues);
  }

  const bodystr = JSON.stringify(formValues.toJS());
  return dispatch({
    [CALL_API]: {
      types: [
        USER_REGISTER,
        {
          type: USER_REGISTER_SUCCESS,
          payload: (_, reduxState, response) => response.json().then((json) => {
            if (!compProps.initialValues) {
              success('User saved successfully!');
              setTimeout(() => {
                dispatch(push('/'));
              }, 500);
              compProps.reset('registerForm');
            } else {
              success('Details updated successfully!');
            }
            return fromJS(json);
          }),
        },
        ajaxFormFailure(USER_REGISTER_FAILURE, compProps),
      ],
      endpoint: '/api/user/',
      method: 'POST',
      body: bodystr,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  });
};

/**
 * Validade form fields on the backend, if it all right call register
 * @param {object} values form fields values
 * @param {object} compProps  component poperties (redux-form props)
 */
export const userRegisterValidate = (values, _, compProps) => (dispatch) => {
  let newValues = values;
  if (compProps.initialValues) {
    newValues = compProps.initialValues.merge(newValues);
  }
  return fetchPolyfill('/api/user/validate', getFetchOptions(newValues))
    .then(resp => resp.json().then((json) => {
      if (resp.status !== 200) {
        throw new SubmissionError(json);
      }
      dispatch(registerUser(compProps));
    }));
};

/**
 * Sign in user, setting access token and user ID in the state
 * @param {Immutable.Map} values form fields values
 */
export const login = values => dispatch => fetchPolyfill('/api/login', getFetchOptions(values))
  .then(resp => resp.json().then((json) => {
    if (resp.status !== 200) {
      throw new SubmissionError(json);
    }
    ls(ACCESS_TOKEN_KEY, json.token);
    ls(USER_ID_KEY, json.id);
    dispatch(updateLoginModalIsOpen(false));
    dispatch({ type: USER_LOGIN_SUCCESS, payload: json });
    dispatch(getUserData());
  }));

  /**
   * Logout user removing all data from state and local storage
   */
export const logout = () => (dispatch, state) => {
  const pathname = state().getIn(['router', 'location', 'pathname']);
  if (pathname === '/my-account' || pathname === '/my-properties') {
    dispatch(push('/'));
  }
  ls.remove(ACCESS_TOKEN_KEY);
  ls.remove(USER_ID_KEY);
  dispatch({ type: USER_LOGOUT });
};
