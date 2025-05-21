import {api, API_BASE_URL} from "../../config/api";
import {
    GET_ALL_REELS_FAILURE,
    GET_ALL_REELS_REQUEST,
    GET_ALL_REELS_SUCCESS, GET_ID_REELS_FAILURE, GET_ID_REELS_REQUEST, GET_ID_REELS_SUCCESS,
    GET_REELS_FAILURE,
    GET_REELS_REQUEST,
    GET_REELS_SUCCESS
} from "./reels.actionType";

export const createReel = (reelsData) => async (dispatch) => {
    dispatch({
        type: GET_REELS_REQUEST
    })
    try {
        const {data} = await api.post(`/api/reels`, reelsData,);
        dispatch({type: GET_REELS_SUCCESS, payload: data});
    } catch (error) {
        console.log("create reels faild -----", error);
        dispatch({type: GET_REELS_FAILURE, payload: error});
    }
};

export const getAllReelsAction = () => async (dispatch) => {
    dispatch({type: GET_ALL_REELS_REQUEST});
    try {
        const {data} = await api.get(`${API_BASE_URL}/api/reels`);
        dispatch({type: GET_ALL_REELS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: GET_ALL_REELS_FAILURE, payload: error});
    }
};

export const getIdReelsAction = (id) => async (dispatch) => {
    dispatch({type: GET_ID_REELS_REQUEST});
    try {
        const {data} = await api.get(`${API_BASE_URL}/api/reels/users/${id}`);
        dispatch({type: GET_ID_REELS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: GET_ID_REELS_FAILURE, payload: error});
    }
};
