import {GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS} from "./user.actionType";


const initialState = {
    user: null,
    users: [],
    error: null,
    loading: false,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USER_REQUEST:
            return { ...state, loading: true, error: null };

        case GET_ALL_USER_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: null,
            };

        case GET_ALL_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
