import {
  SET_API_ERROR,
  SET_API_ERROR_CLEAR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  SET_LOADED_TRUE,
  SET_LOADED_FALSE,
} from '../constants'

export const setLoadedTrue = () => ({
  type: SET_LOADED_TRUE
});

export const setLoadedFalse = () => ({
  type: SET_LOADED_FALSE
});

export const setLoadingTrue = () => ({
  type: SET_LOADING_TRUE
});

export const setLoadingFalse = () => ({
  type: SET_LOADING_FALSE
});

export const setApiError = (payload) => ({
  type: SET_API_ERROR,
  payload
});

export const setApiErrorClear = () => ({
  type: SET_API_ERROR_CLEAR
});