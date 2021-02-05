import {
    SET_APP_TITLE,
} from './constants'

const initialState = {
    title: "Smart Power",
    dark: true,
}

const reducer = (state = initialState, action) => {

    // console.log("REDUCER: ", action)
    switch (action.type) {

        case SET_APP_TITLE:
            return { title: action.payload }

        default:
            return state;
    }
};

export default reducer;