import axios from 'axios'

import {
  USER_LOGIN_REQ,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REG_REQ,
  USER_REG_SUCCESS,
  USER_REG_FAIL,
  USER_PROF_REQ,
  USER_PROF_SUCCESS,
  USER_PROF_FAIL,
  USER_PROF_RESET,
  USER_UPDATE_PROF_REQ,
  USER_UPDATE_PROF_SUCCESS,
  USER_UPDATE_PROF_FAIL,
  USER_LOGOUT,
  USER_LIST_REQ,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQ,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQ,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  
} from "../constants/userConstants";
import { ORDER_USER_LIST_RESET } from "../constants/orderConstants";

export const login = (email, password) => async (dispatch) => {
    try {
       
        dispatch({
            type: USER_LOGIN_REQ
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = 
        await axios.post(
          '/api/users/login', 
          {email, password},
          config
        )

        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data
        });

        localStorage.setItem(
          "userInfo",
          JSON.stringify(data)
        );
        
    } catch (err) {
         dispatch({
           type: USER_LOGIN_FAIL,
           payload:
             err.res && err.res.data.message
               ? err.res.data.message
               : err.message,
         });
        
    }
}

export const reg = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REG_REQ,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REG_SUCCESS,
      payload: data,
    });

     dispatch({
       type: USER_LOGIN_SUCCESS,
       payload: data,
     });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_REG_FAIL,
      payload:
        err.res && err.res.data.message ? err.res.data.message : err.message,
    });
  }
};

export const getUserProf = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROF_REQ,
    });

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      },
    };

    const { data } = await axios.get(
      `/api/users/${id}`, config
    );

    dispatch({
      type: USER_PROF_SUCCESS,
      payload: data,
    });

 
  } catch (err) {
    dispatch({
      type: USER_PROF_FAIL,
      payload:
        err.res && err.res.data.message ? err.res.data.message : err.message,
    });
  }
};

export const updateUserProf = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROF_REQ,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: USER_UPDATE_PROF_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_UPDATE_PROF_FAIL,
      payload:
        err.res && err.res.data.message ? err.res.data.message : err.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQ,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/users", config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        err.res && err.res.data.message ? err.res.data.message : err.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQ,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (err) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        err.res && err.res.data.message ? err.res.data.message : err.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQ,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

   const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({ 
      type: USER_UPDATE_SUCCESS
    });

    dispatch({ 
      type: USER_PROF_SUCCESS,
      payload: data 
    });

  } catch (err) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        err.res && err.res.data.message ? err.res.data.message : err.message,
    });
  }
};


export const logout = () => (dispatch) => {

  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_PROF_RESET });
  dispatch({ type: ORDER_USER_LIST_RESET });
  dispatch({ type: USER_LIST_RESET });
   
  }