
import { api } from "../../config/api";
import { CREATE_CHAT_MESSAGE_FAILURE, CREATE_CHAT_MESSAGE_REQUEST, CREATE_CHAT_MESSAGE_SUCCESS, CREATE_MESSAGE_FAILURE, CREATE_MESSAGE_REQUEST, CREATE_MESSAGE_SUCCESS } from "./message.actionType"
import { GET_ALL_CHATS_MESSAGE_FAILURE, GET_ALL_CHATS_MESSAGE_REQUEST, GET_ALL_CHATS_MESSAGE_SUCCESS, GET_ALL_MESSAGE_REQUEST } from "./message.actionType";

export const createMessageAction = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_MESSAGE_REQUEST });
    try {
        const { data } = await api.post(`/api/messages/chat/${reqData.message.chatId}`,reqData.message);
        
        reqData.sendMessageToServer(data);
        dispatch({ type: CREATE_MESSAGE_SUCCESS , payload: data})
        console.log("create message success ",data);
       
    } catch (error) {
        dispatch({ type: CREATE_MESSAGE_FAILURE, payload : error });
        console.log("error", error);
    }
}
export const createChatAction = (chat) => async (dispatch) => {
    dispatch({ type: CREATE_CHAT_MESSAGE_REQUEST });
    try {
        const { data } = await api.post(`/api/chats`, chat);
        dispatch({ type: CREATE_CHAT_MESSAGE_SUCCESS, payload: data })
        console.log("create chat success:   ",data);
    } catch (error) {
        dispatch({ type: CREATE_CHAT_MESSAGE_FAILURE, payload: error });
        console.log("error", error);
    }
}
export const getAllChats = () => async (dispatch) => {
    dispatch({ type: GET_ALL_CHATS_MESSAGE_REQUEST });
    try {
        const { data } = await api.get(`/api/chats` );
        dispatch({ type: GET_ALL_CHATS_MESSAGE_SUCCESS,payload : data })
        console.log("get chat success:   ", data);
    } catch (error) {
        dispatch({ type: GET_ALL_CHATS_MESSAGE_FAILURE, payload: error });
        console.log("error", error);
    }
}

export const getAllMessageAction = (idChat) => async (dispatch) => {
    dispatch({ type: GET_ALL_MESSAGE_REQUEST });
    try {
        const { data } = await api.get(`api/messages/chat/${idChat} `)
    } catch (error) {

    }
}