
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
  USER_PROF_FAIL,
  USER_UPDATE_PROF_REQ,
  USER_UPDATE_PROF_SUCCESS,
  USER_UPDATE_PROF_FAIL,
  USER_PROF_RESET,
  USER_LIST_REQ,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQ,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQ,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_RESET,
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

export const userProfReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_PROF_REQ:
      return { ...state, loading: true };

    case USER_PROF_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_PROF_FAIL:
      return { loading: false, error: action.payload };

    case USER_PROF_RESET:
      return {
        user: {}
      };

    default:
      return state;
  }
};

export const userUpdateProfReducer = (state = { }, action) => {
  switch (action.type) {
    case USER_UPDATE_PROF_REQ:
      return { loading: true };

    case USER_UPDATE_PROF_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };

    case USER_UPDATE_PROF_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQ:
      return { loading: true };

    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };

    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };

    case USER_LIST_RESET:
      return { users: [] };
      
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQ:
      return { loading: true };

    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };

    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQ:
      return { loading: true };

    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case USER_UPDATE_RESET:
      return { user: [] };

    default:
      return state;
  }
};