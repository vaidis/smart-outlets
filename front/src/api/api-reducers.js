import {
  SET_API_ERROR,
  SET_API_ERROR_CLEAR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  SET_LOADED_TRUE,
  SET_LOADED_FALSE,
} from '../constants'

const initialStore = {
  loading: false,
  error: {
    field: "",
    backend: "",
    message: ""
  }
}

const reducer = (state = initialStore, action) => {

  switch (action.type) {
    case SET_LOADING_TRUE:
      return { ...state, loading: true };

    case SET_LOADING_FALSE:
      return { ...state, loading: false };

    case SET_LOADED_TRUE:
      return { ...state, loaded: true };

    case SET_LOADED_FALSE:
      return { ...state, loaded: false };

    case SET_API_ERROR:
      return { ...state, error: action.payload };

    case SET_API_ERROR_CLEAR:
      return initialStore;

    default:
      return state;
  }
};

export default reducer;
