import {
  USER_SET_DATA,
  USER_LOGOUT_SUCCESS,
  USER_SET_DARK,
} from '../constants'

const initialState = {
  id: 0,
  name: 'anonymous',
  group: 'anonymous',
  dark: false,
  login_time: "None",
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case USER_SET_DATA:
      return action.payload;

    case USER_LOGOUT_SUCCESS:
      return initialState;

    case USER_SET_DARK:
      return { 
        ...state,
        dark: action.payload 
      }

    default:
      return state;
  }
};

export default reducer;