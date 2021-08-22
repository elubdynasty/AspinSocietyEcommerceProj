import axios from 'axios'

import {
  PROD_LIST_REQ,
  PROD_LIST_SUCCESS,
  PROD_LIST_FAIL,
  PROD_DETAILS_REQ,
  PROD_DETAILS_SUCCESS,
  PROD_DETAILS_FAIL,
  PROD_DELETE_REQ,
  PROD_DELETE_SUCCESS,
  PROD_DELETE_FAIL,
} from "../constants/productConstants";


export const listProducts = () => async (dispatch) => {
    try {

        dispatch({type: PROD_LIST_REQ})

        const { data } = await axios.get("/api/products");
        
        dispatch({
            type: PROD_LIST_SUCCESS,
            payload: data
        })

    } catch (err) {

        dispatch({
            type: PROD_LIST_FAIL,
            payload: 
                err.res && err.res.data.message 
                    ? err.res.data.message
                    : err.message
        })
        
    }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROD_DETAILS_REQ });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PROD_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: PROD_DETAILS_FAIL,
      payload:
        err.res && err.res.data.message ? err.res.data.message : err.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROD_DELETE_REQ });

    
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: PROD_DELETE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: PROD_DELETE_FAIL,
      payload:
        err.res && err.res.data.message ? err.res.data.message : err.message,
    });
  }
};