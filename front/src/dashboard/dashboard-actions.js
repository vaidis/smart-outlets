import {
    GET_DASHBOARD,
    SET_DASHBOARD
} from '../constants'

export const getDashboard = () => ({
    type: GET_DASHBOARD,
});

export const setDashboard = (payload) => ({
    type: SET_DASHBOARD,
    payload
});