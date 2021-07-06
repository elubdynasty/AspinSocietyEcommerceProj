
import {
  USER_LOGIN_REQ,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REG_REQ,
  USER_REG_SUCCESS,
  USER_REG_FAIL,
  USER_PROF_REQ,
  USER_PROF_SUCCESS,
  USER_PROF_FAIL
} from "../constants/userConstants";


export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQ:
      return { loading: true};

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REG_REQ:
      return { loading: true };

    case USER_REG_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_REG_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userProfReducer = (state = {user: {}}, action) => {
  switch (action.type) {
    case USER_PROF_REQ:
      return { ...state, loading: true };

    case USER_PROF_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_PROF_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};