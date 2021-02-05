import {
    SET_DASHBOARD
} from '../constants'

const initialState = {}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_DASHBOARD:
            return action.payload;

        default:
            return state;
    }
};

export default reducer;