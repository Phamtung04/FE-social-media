import {
    GET_NOTIFICATION_ALL_FAILURE,
    GET_NOTIFICATION_ALL_REQUEST,
    GET_NOTIFICATION_ALL_SUCCESS, PUT_NOTIFICATION_FAILURE, PUT_NOTIFICATION_REQUEST, PUT_NOTIFICATION_SUCCESS
} from "./noti.actionType";

const initialState = {
    notification: null,
    loading: false,
    error: null,
    notifications: [],
    like: null,
}

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTIFICATION_ALL_REQUEST:
        case PUT_NOTIFICATION_REQUEST:
            return {...state, loading: true, error: null};
        case GET_NOTIFICATION_ALL_SUCCESS:
            return {
                ...state,
                notifications: action.payload,
                loading: false,
                error: null
            };
        case PUT_NOTIFICATION_SUCCESS:
            return {
                ...state,
                notification: action.payload,
                notifications: [action.payload, ...state.notifications],
                loading: false,
                error: null
            };
        case GET_NOTIFICATION_ALL_FAILURE:
        case PUT_NOTIFICATION_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
}