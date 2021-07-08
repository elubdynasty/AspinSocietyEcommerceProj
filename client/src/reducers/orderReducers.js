import {
  ORDER_CREATE_REQ,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_INFO_REQ,
  ORDER_INFO_SUCCESS,
  ORDER_INFO_FAIL
  
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