import { CALL_API } from 'redux-api-middleware';
import ls from 'local-storage';

const { ACCESS_TOKEN_KEY } = process.env;

/**
 * Add Authorization header with token in all CALL_API requests
 */
export default () => next => (action) => {
  const token = ls(ACCESS_TOKEN_KEY);
  const callApi = action[CALL_API];
  if (callApi && token) {
    callApi.headers = Object.assign({}, callApi.headers, {
      Authorization: `Bearer ${token}`,
    });
  }

  return next(action);
};
