import {
    SET_CONTROL,
    SET_CONTROL_TITLE,
    SET_CONTROL_POWER,
} from '../constants'

const initialState = {}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CONTROL:
            return action.payload

        case SET_CONTROL_TITLE:
            return {
                ...state,
                name: action.payload
            }

        case SET_CONTROL_POWER:
            return {
                ...state,
                power: action.payload
            }

        default:
            return state;
    }
};

export default reducer;