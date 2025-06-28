export const FETCH__LOWSTOCK = "FETCH__LOWSTOCK";
export const FETCH__LOWSTOCK__SUCCESS = "FETCH__LOWSTOCK__SUCCESS";
export const FETCH__LOWSTOCK__FAIL = "FETCH__LOWSTOCK__FAIL";

export const fetchLowStock = (data) => ({
  type: FETCH__LOWSTOCK,
  payload: data,
});

export const fetchLowStockSuccess = (data) => ({
  type: FETCH__LOWSTOCK__SUCCESS,
  payload: data,
});

export const fetchLowStockFail = (error) => ({
  type: FETCH__LOWSTOCK__FAIL,
  payload: error,
});

const initialState = {
  lowStock: [],
  loading: false,
  error: null,
};

const getLowStockReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__LOWSTOCK:
      return { ...state, loading: true, error: null };
    case FETCH__LOWSTOCK__SUCCESS:
      return { ...state, loading: false, lowStock: action.payload };
    case FETCH__LOWSTOCK__SUCCESS:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getLowStockReducer;
