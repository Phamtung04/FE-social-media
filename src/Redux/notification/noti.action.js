
import {api} from "../../config/api";
import {
    GET_NOTIFICATION_ALL_FAILURE,
    GET_NOTIFICATION_ALL_REQUEST,
    GET_NOTIFICATION_ALL_SUCCESS, PUT_NOTIFICATION_FAILURE, PUT_NOTIFICATION_REQUEST, PUT_NOTIFICATION_SUCCESS
} from "./noti.actionType";

export const getNotificationAction = () => async (dispatch) => {
    dispatch({type: GET_NOTIFICATION_ALL_REQUEST});
    try {
        const {data} = await api.get(`/api/notifications/filter`);
        console.log("NOTIFICATION post------", data);
        dispatch({type: GET_NOTIFICATION_ALL_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: GET_NOTIFICATION_ALL_FAILURE, payload: error});
        console.log("error:", error);
    }
}

export const putNotificationAction = (id) => async (dispatch) => {
    dispatch({ type: PUT_NOTIFICATION_REQUEST });

    try {
        const { data } = await api.put(`/api/notifications/read/${id}`);
        console.log("NOTIFICATION res------", data);
        dispatch({ type: PUT_NOTIFICATION_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PUT_NOTIFICATION_FAILURE, payload: error?.response?.data || error.message });
        console.error("Notification PUT error:", error);
    }
};
