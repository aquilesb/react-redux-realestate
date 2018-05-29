export const ajaxFailure = (type, meta = {}) => ({
  type,
  meta,
  payload: (_, state, response) => response.json().then(json => json),
});

export default ajaxFailure;
