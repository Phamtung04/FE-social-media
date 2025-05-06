import {
    CREATE_CHAT_MESSAGE_REQUEST,
    CREATE_MESSAGE_REQUEST,
    CREATE_CHAT_MESSAGE_FAILURE,
    CREATE_CHAT_MESSAGE_SUCCESS,
    CREATE_MESSAGE_FAILURE,
    CREATE_MESSAGE_SUCCESS,
    GET_ALL_CHATS_MESSAGE_FAILURE,
    GET_ALL_CHATS_MESSAGE_REQUEST,
    GET_ALL_CHATS_MESSAGE_SUCCESS,
    GET_ALL_MESSAGE_FAILURE
} from "./message.actionType";


const initialState = {
    message: [],
    chat: [],
    loading: false,
    error: null,


}
export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_MESSAGE_REQUEST:
        case CREATE_CHAT_MESSAGE_REQUEST:
        case GET_ALL_CHATS_MESSAGE_REQUEST:
            return { ...state, loading: false, error: null };
        case CREATE_MESSAGE_SUCCESS:
            return { ...state, message: action.payload, loading: false, error: null };
        case CREATE_CHAT_MESSAGE_SUCCESS:
            return { ...state, chat: [action.payload, ...state.chat],loading:false, error:null };
        case GET_ALL_CHATS_MESSAGE_SUCCESS:
            return { ...state, chat: action.payload ,loading:false,error:null};
        case CREATE_MESSAGE_FAILURE:
        case CREATE_CHAT_MESSAGE_FAILURE:
        case GET_ALL_CHATS_MESSAGE_FAILURE:
        case GET_ALL_MESSAGE_FAILURE:
            return { ...state, error: action.payload , loading:false};
        default:
            return state;
    }

}