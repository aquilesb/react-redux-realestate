import { push } from 'connected-react-router';
import { error } from '@/core/Helpers/toastHelper';
import { logout } from '@/modules/User/Store/user.actions';

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
      store.dispatch(logout());
      const pathname = encodeURIComponent(store.getState().getIn(['router', 'location', 'pathname']));
      store.dispatch(push(`/?redirect=${pathname}`));
    } else if (action.payload.status === 404) {
      // store.dispatch(push('/404'))
      error(action.payload.message);
      return next(action);
    }
  } else {
    // So the middleware doesn't get applied to every single action
    return next(action);
  }

  return null;
};
