
import {
  PROD_LIST_REQ,
  PROD_LIST_SUCCESS,
  PROD_LIST_FAIL,
  PROD_DETAILS_REQ,
  PROD_DETAILS_SUCCESS,
  PROD_DETAILS_FAIL,
  PROD_DELETE_REQ,
  PROD_DELETE_SUCCESS,
  PROD_DELETE_FAIL
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