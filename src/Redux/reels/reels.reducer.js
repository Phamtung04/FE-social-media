import {
    GET_REELS_FAILURE,
    GET_REELS_REQUEST,
    GET_REELS_SUCCESS,
    GET_ALL_REELS_REQUEST,
    GET_ALL_REELS_SUCCESS,
    GET_ALL_REELS_FAILURE,
    GET_ID_REELS_REQUEST,
    GET_ID_REELS_SUCCESS,
    GET_ID_REELS_FAILURE
} from "./reels.actionType";

const initialState = {
    reel: null,
    reels: [],
    error: null,
    loading: false,
};

export const reelsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REELS_REQUEST:
        case GET_ALL_REELS_REQUEST:
        case GET_ID_REELS_REQUEST:
            return { ...state, loading: true, error: null };

        case GET_REELS_SUCCESS:
            return {
                ...state,
                reel: action.payload,
                reels: [action.payload, ...state.reels],
                loading: false,
                error: null,
            };

        case GET_ALL_REELS_SUCCESS:
            return {
                ...state,
                reels: action.payload,
                loading: false,
                error: null,
            };

        case GET_ID_REELS_SUCCESS:
            return {
                ...state,
                reel: action.payload,
                loading: false,
                error: null,
            };

        case GET_REELS_FAILURE:
        case GET_ALL_REELS_FAILURE:
        case GET_ID_REELS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
