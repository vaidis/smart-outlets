import {
    take,
    call,
    put,
} from 'redux-saga/effects';

import {
    SET_API_ERROR,
    GET_DASHBOARD,
    SET_DASHBOARD,
    GET_DASHBOARD_FAILED,
    SET_LOADING_TRUE,
    SET_LOADING_FALSE,
} from '../constants'

import api from '../api/api';

function* GetDashboardWorker() {
    yield put({ type: SET_LOADING_TRUE })
    try {
        const response = yield call(api.dashboard)
        yield put({ type: SET_DASHBOARD, payload: response.data });
    } catch (error) {
        yield put({ type: SET_API_ERROR, payload: error.response.data });
        yield put({ type: GET_DASHBOARD_FAILED });
    } finally {
        yield put({ type: SET_LOADING_FALSE })
    }
}

export function* getDashboardWatcher() {
    while (true) {
        yield take(GET_DASHBOARD)
        yield call(GetDashboardWorker);
    }
}