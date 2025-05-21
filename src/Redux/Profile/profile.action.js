import { api, API_BASE_URL } from "../../config/api";
import { FOLLOW_USER_FAILURE, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, GET_PROFILE_ID_FAILURE, GET_PROFILE_ID_REQUEST, GET_PROFILE_ID_SUCCESS } from "./profile.actionType";

export const getProfileByIdAction = (id) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_ID_REQUEST });
  try {
    const jwt = localStorage.getItem("jwt");
    const { data } = await api.get(`${API_BASE_URL}/api/users/${id}`, {
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json"
      }
    });
    dispatch({ type: GET_PROFILE_ID_SUCCESS, payload: data });
  } catch (error) {
    console.log("------", error);
    dispatch({ type: GET_PROFILE_ID_FAILURE, payload: error });
  }
};
export const followUserAction = (userId) => async (dispatch) => {
  dispatch({ type: FOLLOW_USER_REQUEST });
  try {
    
    const { data } = await api.put(`${API_BASE_URL}/api/users/follow/${userId}`, {});
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
    console.log("follow",data);
  } catch (error) {
    console.log("Follow user error:", error);
    dispatch({ type: FOLLOW_USER_FAILURE, payload: error });
  }
};