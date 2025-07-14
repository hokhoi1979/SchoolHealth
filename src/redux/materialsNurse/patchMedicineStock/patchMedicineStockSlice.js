export const PATCH__QUANTITY__STOCK = "PATCH__QUANTITY__STOCK";
export const PATCH__QUANTITY__STOCK__SUCCESS =
  "PATCH__QUANTITY__STOCK__SUCCESS";
export const PATCH__QUANTITY__STOCK__FAIL = "PATCH__QUANTITY__STOCK__FAIL";

export const patchQuantityStock = (data) => ({
  type: PATCH__QUANTITY__STOCK,
  payload: data,
});

export const patchQuantityStockSuccess = (data) => ({
  type: PATCH__QUANTITY__STOCK__SUCCESS,
  payload: data,
});

export const patchQuantityStockFail = (error) => ({
  type: PATCH__QUANTITY__STOCK__FAIL,
  payload: error,
});

const initialState = {
  quantityStock: [],
  loading: false,
  error: null,
};

const patchQuantityStockReducer = (state = initialState, action) => {
  switch (action.type) {
    case PATCH__QUANTITY__STOCK:
      return { ...state, loading: true, error: null };
    case PATCH__QUANTITY__STOCK__SUCCESS:
      return { ...state, loading: false, quantityStock: action.payload };
    case PATCH__QUANTITY__STOCK__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default patchQuantityStockReducer;
