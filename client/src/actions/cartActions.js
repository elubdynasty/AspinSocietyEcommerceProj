import axios from "axios";

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADD,
  CART_SAVE_PAYMENT_TYPE
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: { 
          product: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          countinStock: data.countinStock,
          qty
      }
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

};


export const removeFromCart = (id) => async (dispatch, getState) => {

  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAdd = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADD,
    payload: data,
  });

  localStorage.setItem("shippingAdd", JSON.stringify(data));
};

export const savePaymentType = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_TYPE,
    payload: data
  });

  localStorage.setItem("paymentType", JSON.stringify(data));
};;