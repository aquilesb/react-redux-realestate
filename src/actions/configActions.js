import { CONFIG_UPDATE_IS_PROD } from './actionTypes';

export const updateIsProd = isProd => ({ type: CONFIG_UPDATE_IS_PROD, isProd });

export default updateIsProd;
