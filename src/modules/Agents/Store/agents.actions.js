import { CALL_API } from 'redux-api-middleware';
import { fromJS } from 'immutable';
import { ajaxFailure } from '@/core/Helpers/ajaxHelper';
import {
  AGENTS_GET_LIST,
  AGENTS_GET_LIST_SUCCESS,
  AGENTS_GET_LIST_FAILURE,
} from './agents.actionTypes';

export const getAgents = () => ({
  [CALL_API]: {
    types: [
      AGENTS_GET_LIST,
      {
        type: AGENTS_GET_LIST_SUCCESS,
        payload: (_, state, response) => response.json().then(json => fromJS(json)),
      },
      ajaxFailure(AGENTS_GET_LIST_FAILURE),
    ],
    endpoint: '/api/agents/list',
    method: 'GET',
  },
});

export default getAgents;
