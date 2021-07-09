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
  ORDER_PAY_RESET
  
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {

    switch (action.type) {
      case ORDER_CREATE_REQ:
        return {
          loading: true,
        };

      case ORDER_CREATE_SUCCESS:
        return {
          loading: false,
          success: true,
          order: action.payload,
        };

      case ORDER_CREATE_FAIL:
        return {
          loading: false,
          error: action.payload
        };

      default:
        return state;
    }
}

export const orderInfoReducer = (
  state = { loading: true, orderItems: [], shippingAdd: {} },
  action
) => {
  switch (action.type) {
    case ORDER_INFO_REQ:
      return {
        ...state,
        loading: true,
      };

    case ORDER_INFO_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_INFO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {

  switch (action.type) {
    case ORDER_PAY_REQ:
      return {
        loading: true,
      };

    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};