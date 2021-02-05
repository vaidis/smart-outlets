import {
    GET_CONTROL,
    SET_CONTROL,
    GET_CONTROL_FAILED,
    SET_CONTROL_FAILED,
    SET_CONTROL_TITLE,
    SET_CONTROL_POWER,
} from '../constants'

export const getControl = (payload) => ({
    type: GET_CONTROL,
    payload
});

export const getControlFailed = (payload) => ({
    type: GET_CONTROL_FAILED,
    payload
});

export const setControl = (payload) => ({
    type: SET_CONTROL,
    payload
});

export const setControlFailed = (payload) => ({
    type: SET_CONTROL_FAILED,
    payload
});

export const setControlTitle = (payload) => ({
    type: SET_CONTROL_TITLE,
    payload
});

export const setControlPower = (payload) => ({
    type: SET_CONTROL_POWER,
    payload
});