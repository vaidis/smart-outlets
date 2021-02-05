import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_GET_DATA,
  USER_SET_DATA,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
  USER_SET_DARK,
} from '../constants'

// -------------------------------------------- LOGIN
export const userLoginRequest = (payload) => ({
  type: USER_LOGIN_REQUEST,
  payload
});

export const userLoginSuccess = (payload) => ({
  type: USER_LOGIN_SUCCESS,
  payload
});

export const userLoginFailure = (payload) => ({
  type: USER_LOGIN_FAILURE,
  payload
});

// -------------------------------------------- DATA
export const userGetData = (payload) => ({
  type: USER_GET_DATA,
  payload
});

export const userSetData = (payload) => ({
  type: USER_SET_DATA,
  payload
});

// -------------------------------------------- LOGOUT
export const userLogoutRequest = (payload) => ({
  type: USER_LOGOUT_REQUEST,
  payload
});

export const userLogoutSuccess = () => ({
  type: USER_LOGOUT_SUCCESS,
});

export const userLogoutFailure = (payload) => ({
  type: USER_LOGOUT_FAILURE,
  payload
});

export const userSetDark = (payload) => (
  console.log("USER_SET_DARK: ", payload) || {
    type: USER_SET_DARK,
    payload
  });    