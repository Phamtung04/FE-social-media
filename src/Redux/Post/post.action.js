
import { api, API_BASE_URL } from "../../config/api";
import {
  CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_ALL_POST_FAILURE,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_USERS_POST_FAILURE,
  GET_USERS_POST_REQUEST,
  GET_USERS_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS
}
  from "./post.actionType";

export const createPostAction = (postData) => async (dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST })
  try {
    const { data } = await api.post(`/api/posts/user`, postData,);
    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    console.log("create post success-----", data)
  } catch (error) {
    console.log("create post faild -----", error);
    dispatch({ type: CREATE_POST_FAILURE, payload: error });
  }
}

export const getAllPostAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_POST_REQUEST });
  try {

    const { data } = await api.get(`${API_BASE_URL}/api/posts`);


    dispatch({ type: GET_ALL_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_POST_FAILURE, payload: error });
  }
};

export const getUsersPostAction = (Uid) => async (dispatch) => {
  dispatch({ type: GET_USERS_POST_REQUEST });
  try {

  
    const { data } = await api.get(`${API_BASE_URL}/api/posts/user/${Uid}`);
    console.log("get all post------", data);


    dispatch({ type: GET_USERS_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USERS_POST_FAILURE, payload: error });
    console.log("error", error);
  }
};
export const getLikePostAction = (Pid) => async (dispatch) => {
  dispatch({ type: LIKE_POST_REQUEST });
  try {
 
    const { data } = await api.put(`/api/posts/like/${Pid}`);
    console.log("like post------", data);
    dispatch({ type: LIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LIKE_POST_FAILURE, payload: error });
    console.log("error:", error);
  }
};
// comment

export const createCommentAction = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_COMMENT_REQUEST })
  try {
  
    const { data } = await api.post(`/api/comments/post/${reqData.postId}`, reqData.data);
    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
    console.log("create commet success-----", data)
  } catch (error) {
    console.log("create pcommet faild -----", error);
    dispatch({ type: CREATE_COMMENT_FAILURE, payload: error });
  }
}