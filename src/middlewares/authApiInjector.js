import { CALL_API } from 'redux-api-middleware';
import ls from 'local-storage';

/**
 * Add Authorization header with token in all CALL_API requests
 */
export default () => next => (action) => {
  const token = ls('accessToken');
  const callApi = action[CALL_API];
  if (callApi && token) {
    callApi.headers = Object.assign({}, callApi.headers, {
      Authorization: `Bearer ${token}`,
    });
  }

  return next(action);
};
