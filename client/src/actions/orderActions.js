import axios from 'axios'

import {
  ORDER_CREATE_REQ,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_INFO_REQ,
  ORDER_INFO_SUCCESS,
  ORDER_INFO_FAIL,
  ORDER_PAY_REQ,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_USER_LIST_REQ,
  ORDER_USER_LIST_SUCCESS,
  ORDER_USER_LIST_FAIL,
  ORDER_LIST_REQ,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQ,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQ,
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

    const { data } = await axios.post("/api/orders", order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        err.res && err.res.data.message ? err.res.data.message : err.message,
    });
  }
};

export const getOrderInfo = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_INFO_REQ,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_INFO_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_INFO_FAIL,
      payload:
        err.res && err.res.data.message ? err.res.data.message : err.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQ,
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

    const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        err.res && err.res.data.message ? err.res.data.message : err.message,
    });
  }
};

export const deliverOrder =
  (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DELIVER_REQ,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        config
      );

      dispatch({
        type: ORDER_DELIVER_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ORDER_DELIVER_FAIL,
        payload:
          err.res && err.res.data.message ? err.res.data.message : err.message,
      });
    }
  };

export const listOrders =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_USER_LIST_REQ,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        "/api/orders/myorders",
        config
      );

      dispatch({
        type: ORDER_USER_LIST_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ORDER_USER_LIST_FAIL,
        payload:
          err.res && err.res.data.message ? err.res.data.message : err.message,
      });
    }
  };

  export const listAllOrders = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_REQ,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get("/api/orders", config);

      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ORDER_LIST_FAIL,
        payload:
          err.res && err.res.data.message ? err.res.data.message : err.message,
      });
    }
  };