import {
    GET_APP_TITLE,
    SET_APP_TITLE,
} from './constants'

// -------------------------------------------- TITLE
export const getAppTitle = (payload) => (
    console.log("GET_APP_TITLE: ", payload) || {
        type: GET_APP_TITLE,
        payload
    });

export const setAppTitle = (payload) => (
    console.log("SET_APP_TITLE: ", payload) || {
        type: SET_APP_TITLE,
        payload
    });
