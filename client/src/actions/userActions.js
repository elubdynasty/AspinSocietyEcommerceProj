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

export const logout = () => (dispatch) => {

  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_PROF_RESET });
  dispatch({ type: ORDER_USER_LIST_RESET });
   
  }