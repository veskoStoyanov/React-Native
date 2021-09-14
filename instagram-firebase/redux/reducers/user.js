import { USER_STATE_CHANGED, USER_POSTS_STATE_CHANGE } from '../constants';

const initialState = {
    currentUser: null,
    posts: []
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGED:
            return { ...state, currentUser: action.payload};
            case USER_POSTS_STATE_CHANGE:
        return { ...state, posts: action.payload};

        default:
            return state;
    }
}