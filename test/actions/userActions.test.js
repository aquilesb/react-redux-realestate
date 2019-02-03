import configureMockStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import fetchMock from 'fetch-mock';
import * as actions from '../../src/actions/userActions';
import * as types from '../../src/actions/actionTypes';
import userDetail from '../mockData/userDetail.json';

const mockStore = configureMockStore([thunk, apiMiddleware]);

describe('userActions actions', () => {
  let initialState;

  beforeAll(() => {
    initialState = fromJS({
      user: {
        id: 'a2dss23zvs334aswas',
      },
    });
  });

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  test('should load user details', () => {
    const userID = initialState.getIn(['user', 'id']);
    fetchMock.getOnce(`/api/user/${userID}`, userDetail);

    const expectedActions = [
      { type: types.USER_FETCH_DATA },
      { type: types.USER_FETCH_DATA_SUCCESS, payload: fromJS(userDetail) },
    ];

    const store = mockStore(initialState);
    return store.dispatch(actions.getUserData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should not load user details', () => {
    const userID = initialState.getIn(['user', 'id']);
    const error = {
      name: 'ApiError',
      status: 404,
    };
    fetchMock.getOnce(`/api/user/${userID}`, {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
      body: error,
    });

    const expectedActions = [
      { type: types.USER_FETCH_DATA },
      {
        type: types.USER_FETCH_DATA_FAILURE,
        error: true,
        meta: {},
        payload: error,
      },
    ];

    const store = mockStore(initialState);
    return store.dispatch(actions.getUserData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
