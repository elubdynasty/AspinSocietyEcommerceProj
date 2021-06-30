
import { 
    PROD_LIST_REQ, 
    PROD_LIST_SUCCESS, 
    PROD_LIST_FAIL 
} from '../constants/productConstants'

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
