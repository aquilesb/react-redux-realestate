import ls from 'local-storage';
import { getUserData, updateAuthPending } from './userActions';
import { getAgents } from './agentsActions';
import { getFeaturedProps, getRecommendedProps, getHotProps, getNewProps } from './propertieActions';
import { hideSpinner } from './layoutActions';
import { updateIsProd } from './configActions';
import { getPriceTypes } from './searchActions';

const { ACCESS_TOKEN_KEY, USER_ID_KEY, NODE_ENV } = process.env;
const loadInitialData = () => (dispatch) => {
  const token = ls(ACCESS_TOKEN_KEY);
  const userID = ls(USER_ID_KEY);

  const promises = [
    dispatch(getAgents()),
    dispatch(getFeaturedProps()),
    dispatch(getRecommendedProps()),
    dispatch(getHotProps()),
    dispatch(getNewProps()),
    dispatch(getPriceTypes()),
    dispatch(updateIsProd(NODE_ENV === 'production')),
  ];

  if (token && userID) {
    promises.push(dispatch(getUserData(userID)));
  }

  return Promise.all(promises).then(() => {
    dispatch(hideSpinner());
    dispatch(updateAuthPending());
  });
};

export default loadInitialData;
