import {
    fork,
    take,
    call,
    put,
    select,
} from 'redux-saga/effects';

import {
    GET_CONTROL,
    SET_CONTROL,
    GET_CONTROL_FAILED,
    SET_LOADING_TRUE,
    SET_LOADING_FALSE,
    SET_LOADED_TRUE,
    SET_LOADED_FALSE,
    SET_CONTROL_TITLE,
    SET_CONTROL_POWER,
} from '../constants'

import api from '../api/api';

function* getControlWorker(payload) {
    yield put({ type: SET_LOADING_TRUE })
    yield put({ type: SET_LOADED_FALSE })
    try {
        const response = yield call(api.getOutlet, payload)
        yield put({ type: SET_CONTROL, payload: response.data[0] });
    } catch (error) {
        yield put({ type: GET_CONTROL_FAILED });
    } finally {
        yield put({ type: SET_LOADING_FALSE })
        yield put({ type: SET_LOADED_TRUE })
    }
}

function* postControlWorker() {
    const state = yield select();
    const outlet = state.control;
    try {
        const response = yield call(api.postOutlet, outlet)
    } catch (error) {
        yield put({ type: GET_CONTROL_FAILED });
    } 
}

export function* getControlWatcher() {
    while (true) {
        const payload = yield take(GET_CONTROL);
        yield fork(getControlWorker, payload.payload)
    }
}
export function* setControTitlelWatcher() {
    while (true) {
        yield take(SET_CONTROL_TITLE);
        yield fork(postControlWorker)
    }
}
export function* setControPowerlWatcher() {
    while (true) {
        yield take(SET_CONTROL_POWER);
        yield fork(postControlWorker)
    }
}