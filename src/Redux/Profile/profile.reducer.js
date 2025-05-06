import { FOLLOW_USER_FAILURE, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, GET_PROFILE_ID_FAILURE, GET_PROFILE_ID_REQUEST, GET_PROFILE_ID_SUCCESS } from "./profile.actionType";

const initialState = {
  user: null,
  error: null,
  loading: false,
};
export const profileReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_PROFILE_ID_REQUEST:
    case FOLLOW_USER_REQUEST:

      return { ...state, loading: true, error: null };

    case GET_PROFILE_ID_SUCCESS:
    case FOLLOW_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: null };

    case GET_PROFILE_ID_FAILURE:
    case FOLLOW_USER_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
};