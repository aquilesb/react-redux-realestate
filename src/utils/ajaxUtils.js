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

export default ajaxFailure;
