import axios from 'axios'

import {
  PROD_LIST_REQ,
  PROD_LIST_SUCCESS,
  PROD_LIST_FAIL,
  PROD_DETAILS_REQ,
  PROD_DETAILS_SUCCESS,
  PROD_DETAILS_FAIL,
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