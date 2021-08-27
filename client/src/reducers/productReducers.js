
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
  PROD_CREATE_REQ,
  PROD_CREATE_SUCCESS,
  PROD_CREATE_FAIL,
  PROD_CREATE_RESET,
  PROD_UPDATE_REQ,
  PROD_UPDATE_SUCCESS,
  PROD_UPDATE_FAIL,
  PROD_UPDATE_RESET
} from "../constants/productConstants";

export const productListReducer = (state={ products: [] }, action) => {
    
    switch (action.type) {
      case PROD_LIST_REQ:
        return { loading: true, products: [] };

      case PROD_LIST_SUCCESS:
        return { loading: false, products: action.payload };

      case PROD_LIST_FAIL:
        return { loading: false, error: action.payload };

      default:
          return state
    }
}

export const productDetailsReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PROD_DETAILS_REQ:
      return { loading: true, ...state };

    case PROD_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };

    case PROD_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDeleteReducer = (state = { }, action) => {
  switch (action.type) {
    case PROD_DELETE_REQ:
      return { loading: true};

    case PROD_DELETE_SUCCESS:
      return { loading: false, success: true };

    case PROD_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROD_CREATE_REQ:
      return { loading: true };

    case PROD_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case PROD_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case PROD_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PROD_UPDATE_REQ:
      return { loading: true };

    case PROD_UPDATE_SUCCESS:
      return { loading: false, success: true }; //product: action.payload

    case PROD_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case PROD_UPDATE_RESET:
      return { product: {} };

    default:
      return state;
  }
};