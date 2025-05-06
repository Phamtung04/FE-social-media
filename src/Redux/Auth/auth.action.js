import axios from "axios";
import {api, API_BASE_URL} from "../../config/api";
import {
    CHANGE_PASSWORD_FAILURE,
    CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    GET_POST_FAILURE,
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    GET_PROFILE_FAILURE,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    SEARCH_USER_FAILURE,
    SEARCH_USER_REQUEST,
    SEARCH_USER_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS, VERIFY_PASSWORD_CODE_FAILURE, VERIFY_PASSWORD_CODE_REQUEST, VERIFY_PASSWORD_CODE_SUCCESS
} from "./auth.actionType";

export const loginUserAction = (loginData) => async (dispatch) => {
    dispatch({type: LOGIN_REQUEST});
    try {
        const {data} = await axios.post(
            `${API_BASE_URL}/auth/signin`,
            loginData.data
        );

        if (data.token) {
            localStorage.setItem("jwt", data.token);
        }
        console.log("login", data);

        dispatch({type: LOGIN_SUCCESS, payload: data.token});
    } catch (error) {
        console.log("------", error);
        dispatch({type: LOGIN_FAILURE, payload: error});
    }
};

export const registerUserAction = (loginData) => async (dispatch) => {
    dispatch({type: LOGIN_REQUEST});
    try {
        const {data} = await axios.post(
            `${API_BASE_URL}/auth/register`,
            loginData.data
        );

        if (data.token) {
            localStorage.setItem("jwt", data.token);
        }
        console.log("register", data);

        dispatch({type: REGISTER_SUCCESS, payload: data.jwt});
    } catch (error) {
        console.log("------", error);
        dispatch({type: REGISTER_FAILURE, payload: error});
    }
};

export const getProfileAction = () => async (dispatch) => {
    dispatch({type: GET_PROFILE_REQUEST});
    try {
        const jwt = localStorage.getItem("jwt");
        const {data} = await axios.get(`${API_BASE_URL}/api/users/profile`,
            {
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("profile------", data);


        dispatch({type: GET_PROFILE_SUCCESS, payload: data});
    } catch (error) {
        console.log("------", error);
        dispatch({type: GET_PROFILE_FAILURE, payload: error});
    }
};
export const searchUser = (query) => async (dispatch) => {
    dispatch({type: SEARCH_USER_REQUEST});
    try {
        const {data} = await api.get(`/api/users/search?query=${query}`);

        console.log("user------", data);


        dispatch({type: SEARCH_USER_SUCCESS, payload: data});
    } catch (error) {
        console.log("------", error);
        dispatch({type: SEARCH_USER_FAILURE, payload: error});
    }
};


export const updateProfileAction = (value) => async (dispatch) => {
    dispatch({type: UPDATE_PROFILE_REQUEST});
    try {

        const {data} = await api.put(`${API_BASE_URL}/api/users/profile`, value.data);

        console.log("UPDATE profile------", data);

        dispatch({type: UPDATE_PROFILE_SUCCESS, payload: data});
    } catch (error) {
        console.log("------", error);
        dispatch({type: UPDATE_PROFILE_FAILURE, payload: error});
    }
};
export const logoutAction = () => async (dispatch) => {
    try {

        localStorage.removeItem("jwt");
        dispatch({type: LOGOUT_SUCCESS});
    } catch (error) {
        dispatch({type: LOGOUT_FAIL, payload: error});
    }
};

export const forgotPasswordAction = (value) => async (dispatch) => {
    dispatch({type: FORGOT_PASSWORD_REQUEST});
    try {
        const {data} = await axios.post(`${API_BASE_URL}/api/forgotPassword/verifyMail`, value.data);

        dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: data});
    } catch (error) {
        console.log("------", error);
        dispatch({type: FORGOT_PASSWORD_FAILURE, payload: error});
    }
}

export const verifyPasswordCodeAction = (value) => async (dispatch) => {
    dispatch({type: VERIFY_PASSWORD_CODE_REQUEST});
    try {
        const data = await axios.post(`${API_BASE_URL}/api/forgotPassword/verify/otp`, value);

        dispatch({type: VERIFY_PASSWORD_CODE_SUCCESS, payload: data.data});
    } catch (error) {
        console.log("------", error);
        dispatch({type: VERIFY_PASSWORD_CODE_FAILURE, payload: error});
    }
}

export const resetPasswordAction = (value) => async (dispatch) => {
    dispatch({type: CHANGE_PASSWORD_REQUEST});
    try {
        const data = await axios.post(`${API_BASE_URL}/api/forgotPassword/changePassword`, value);
        dispatch({type: CHANGE_PASSWORD_SUCCESS, payload: data.data});
        console.log("reset password------", data);
    } catch (error) {
        console.log("-----", error);
        dispatch({type: CHANGE_PASSWORD_FAILURE, payload: error});
    }
}





