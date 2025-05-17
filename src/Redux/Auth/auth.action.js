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
import {useNotify} from "../../hooks/useNotify";



export const loginUserAction = (loginData) => async (dispatch) => {
    const {successNotify, errorNotify} = useNotify();

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
        successNotify("Welcome to social media");
    } catch (error) {
        console.log("------", error);
        dispatch({type: LOGIN_FAILURE, payload: error});
        errorNotify(error.response.data.message || "Thông tin tài khoản và mật khẩu không chính xác");
    }
};

export const registerUserAction = (loginData) => async (dispatch) => {
    const {successNotify, errorNotify} = useNotify();
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
        successNotify("Đăng ký thành công");
    } catch (error) {
        console.log("------", error);
        dispatch({type: REGISTER_FAILURE, payload: error});
        errorNotify(error.response.data.message || "Đăng ký thất bại");
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
    const {successNotify} = useNotify();
    try {
        localStorage.removeItem("jwt");
        dispatch({type: LOGOUT_SUCCESS});
        successNotify("Đăng xuất thành công");
    } catch (error) {
        dispatch({type: LOGOUT_FAIL, payload: error});
    }
};

export const forgotPasswordAction = (value) => async (dispatch) => {
    const {successNotify, errorNotify} = useNotify();
    dispatch({type: FORGOT_PASSWORD_REQUEST});
    try {
        const {data} = await axios.post(`${API_BASE_URL}/api/forgotPassword/verifyMail`, value.data);
        dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: data});
        successNotify("Mã xác nhận đã được gửi vào email của bạn");
    } catch (error) {
        console.log("------", error);
        dispatch({type: FORGOT_PASSWORD_FAILURE, payload: error});
        errorNotify(error.response.data.message || "Email không tồn tại");
    }
}

export const verifyPasswordCodeAction = (value) => async (dispatch) => {
    const {successNotify, errorNotify} = useNotify();
    dispatch({type: VERIFY_PASSWORD_CODE_REQUEST});
    try {
        const data = await axios.post(`${API_BASE_URL}/api/forgotPassword/verify/otp`, value);
        dispatch({type: VERIFY_PASSWORD_CODE_SUCCESS, payload: data.data});
        successNotify("Thành công");
    } catch (error) {
        console.log("------", error);
        dispatch({type: VERIFY_PASSWORD_CODE_FAILURE, payload: error});
        errorNotify(error.response.data.message || "Mã xác nhận không chính xác");
    }
}

export const resetPasswordAction = (value) => async (dispatch) => {
    const {successNotify, errorNotify} = useNotify();
    dispatch({type: CHANGE_PASSWORD_REQUEST});
    try {
        const data = await axios.post(`${API_BASE_URL}/api/forgotPassword/changePassword`, value);
        dispatch({type: CHANGE_PASSWORD_SUCCESS, payload: data.data});
        successNotify("Thành công");
    } catch (error) {
        console.log("-----", error);
        dispatch({type: CHANGE_PASSWORD_FAILURE, payload: error});
        errorNotify(error.response.data.message || "Mã xác nhận không chính xác");
    }
}





