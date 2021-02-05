import {
  select,
  fork,
  take,
  call,
  put,
} from 'redux-saga/effects';

import {
  SET_API_ERROR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAILURE,
  USER_SET_DATA,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
  USER_SET_DARK,
} from '../constants'

import api from '../api/api';
import history from '../history';

function forwardTo(location) {
  history.push(location);
}

function* UserLoginWorker(loginOptions) {
  yield put({ type: SET_LOADING_TRUE })
  const credentials = {
    "name": loginOptions.credentials.user,
    "pass": loginOptions.credentials.pass
  }
  try {
    const response = yield call(api.login, credentials)
    yield put({ type: USER_SET_DATA, payload: response });
  } catch (error) {
    yield put({ type: SET_API_ERROR, payload: error });
    yield put({ type: USER_LOGIN_FAILURE });
  } finally {
    yield put({ type: SET_LOADING_FALSE })
    yield call(forwardTo, '/');
  }
}

function* UserLogoutWorker() {
  yield put({ type: SET_LOADING_TRUE })
  try {
    const state = yield select();
    yield call(api.logout, state.user.id);
    yield put({ type: USER_LOGOUT_SUCCESS });
  } catch (error) {
    yield put({ type: USER_LOGOUT_FAILURE });
  } finally {
    yield put({ type: SET_LOADING_FALSE })
  }
}

function* userSetDarkWorker(payload) {
  yield put({ type: SET_LOADING_TRUE })
  try {
    const state = yield select();
    const body = {
      id: state.user.id,
      dark: state.user.dark,
    }
    const response = yield call(api.dark, body);
    yield put({ type: USER_SET_DARK, payload: response.data.dark });
  } catch (error) {
  } finally {
    yield put({ type: SET_LOADING_FALSE })
  }
}

export function* userLoginWatcher() {
  while (true) {
    const actionPayload = yield take(USER_LOGIN_REQUEST);
    const credentials = {
      "user": actionPayload.payload.user,
      "pass": actionPayload.payload.pass
    }
    const loginOptions = { credentials }
    yield fork(UserLoginWorker, loginOptions)
  }
}

export function* userLogoutWatcher() {
  while (true) {
    yield take(USER_LOGOUT_REQUEST)
    yield call(UserLogoutWorker);
  }
}

export function* userSetDarkWatcher() {
  while (true) {
    const payload = yield take(USER_SET_DARK);
    yield call(userSetDarkWorker, payload);
  }
}