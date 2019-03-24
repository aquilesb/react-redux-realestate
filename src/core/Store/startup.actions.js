import ls from 'local-storage';
import { getUserData, updateAuthPending } from '@/modules/User/Store/user.actions';
import { getAgents } from '@/modules/Agents/Store/agents.actions';
import { getFeaturedProps, getRecommendedProps, getHotProps, getNewProps } from '@/modules/Properties/Store/properties.actions';
import { hideSpinner } from '@/modules/Layout/Store/layout.actions';
import { getPriceTypes } from '@/modules/Search/Store/search.actions';

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
