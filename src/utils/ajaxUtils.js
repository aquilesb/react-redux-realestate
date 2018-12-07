import { fromJS } from 'immutable';

/**
 * Get fetch optionsobject
 * @param {Immutable.Map} body request body
 * @param {string} method http method
 * @return {object} pre defined request configuration
 */
export const getFetchOptions = (body = fromJS({}), method = 'POST') => ({
  method,
  body: JSON.stringify(body.toJS()),
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * Generate the object when there is an ajax failure
 * @param {string} type Action Type
 * @param {object} meta data to be saved
 * @returns {object} api ajax failure
 */
export const ajaxFailure = (type, meta = {}) => ({
  type,
  meta,
  payload: (_, state, response) => {
    const baseError = {
      status: response.status,
      name: 'ApiError',
    };
    return response.json().then(json => Object.assign({}, baseError, json));
  },
});

/**
 * Get errors from back end and show in the form
 * @param {string} type action type
 * @param {object} compProps components properties (all properties from redux-form)
 */
export const ajaxFormFailure = (type, compProps) => ({
  type,
  meta: {},
  payload: (_, state, response) => {
    return response.json().then((json) => {
      compProps.stopSubmit(json);
      return null;
    });
  },
});
