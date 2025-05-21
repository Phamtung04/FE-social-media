import {api, API_BASE_URL} from "../../config/api";
import {GET_ALL_USER_FAILURE, GET_ALL_USER_REQUEST, GET_ALL_USER_SUCCESS} from "./user.actionType";


export const getAllUserAction = () => async (dispatch) => {
    dispatch({type: GET_ALL_USER_REQUEST});
    try {
        const {data} = await api.get(`${API_BASE_URL}/api/users`);
        dispatch({type: GET_ALL_USER_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: GET_ALL_USER_FAILURE, payload: error});
    }
};