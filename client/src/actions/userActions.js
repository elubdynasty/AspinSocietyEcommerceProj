import axios from 'axios'

import {
  USER_LOGIN_REQ,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REG_REQ,
  USER_REG_SUCCESS,
  USER_REG_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";

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

export const logout = () => (dispatch) => {

  localStorage.removeItem('userInfo')
  dispatch({type: USER_LOGOUT})
   
  }