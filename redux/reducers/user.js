import { USER_STATE_CHANGED } from '../constants';

const initialState = {
    currentUser: null
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGED:
            return { ...state, currentUser: action.payload};

        default:
            return state;
    }
}