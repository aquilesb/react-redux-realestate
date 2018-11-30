import { getAgents } from './agentsActions';
import { getFeaturedProps, getRecommendedProps, getHotProps, getNewProps } from './propertieActions';
import { hideSpinner } from './layoutActions';
import { updateIsProd } from './configActions';
import { getPriceTypes } from './searchActions';

const loadInitialData = () => (dispatch) => {
  const promises = [
    dispatch(getAgents()),
    dispatch(getFeaturedProps()),
    dispatch(getRecommendedProps()),
    dispatch(getHotProps()),
    dispatch(getNewProps()),
    dispatch(getPriceTypes()),
    dispatch(updateIsProd(process.env.NODE_ENV === 'production')),
  ];
  return Promise.all(promises).then(() => {
    dispatch(hideSpinner());
  });
};

export default loadInitialData;
