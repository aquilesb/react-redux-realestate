// apiError.js

// import {logout} from '../modules/auth'
// import {push} from 'react-router-redux'

export default store => next => (action) => {
  if (action.payload && action.payload.name === 'ApiError') {
    if (action.payload.status === 403) {
      if (action.error && action.meta) {
        store.dispatch(action.meta.handler(action.meta.errorMsg, action.meta.pushTo));
      } else {
        // To avoid getting stuck in middleware.
        return next(action);
      }
    } else if (action.payload.status === 401) {
      // const errorMsg = 'Your session has expired. Please login again.';
      // store.dispatch(logout(true, errorMsg))
    } else if (action.payload.status === 404) {
      // store.dispatch(push('/404'))zz
    }
  } else {
    // So the middleware doesn't get applied to every single action
    return next(action);
  }

  return null;
};
