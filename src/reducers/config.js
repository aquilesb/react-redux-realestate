import { fromJS } from 'immutable';
import * as Actions from '../actions/configActions';

const initialState = fromJS({
  isProd: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.CONFIG_UPDATE_IS_PROD:
      return state.set('isProd', action.isProd);

    default:
      return state;
  }
};
