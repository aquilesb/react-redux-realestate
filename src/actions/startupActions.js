import ls from 'local-storage';
import { getUserData } from './userActions';
import { getAgents } from './agentsActions';
import { getFeaturedProps, getRecommendedProps, getHotProps, getNewProps } from './propertieActions';
import { hideSpinner } from './layoutActions';
import { updateIsProd } from './configActions';
import { getPriceTypes } from './searchActions';

const { ACCESS_TOKEN_KEY, USER_ID_KEY } = process.env;
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
    dispatch(updateIsProd(process.env.NODE_ENV === 'production')),
  ];

  if (token && userID) {
    promises.push(dispatch(getUserData(userID)));
  }

  return Promise.all(promises).then(() => {
    dispatch(hideSpinner());
  });
};

export default loadInitialData;
