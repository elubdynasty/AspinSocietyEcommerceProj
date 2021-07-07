import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADD,
  CART_SAVE_PAYMENT_TYPE
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [], shippingAdd: {} }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find(
        (cartItem) => cartItem.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product === existItem.product ? item : cartItem
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.product !== action.payload
        ),
      };

    case CART_SAVE_SHIPPING_ADD:
      return {
        ...state,
        shippingAdd: action.payload,
      };

    case CART_SAVE_PAYMENT_TYPE:
      return {
        ...state,
        paymentType: action.payload,
      };

    default:
      return state;
  }
};