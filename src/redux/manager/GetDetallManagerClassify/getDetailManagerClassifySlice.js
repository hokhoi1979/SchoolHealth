export const FETCH__DETAIL__MANAGER__CLASSIFY =
  "FETCH__DETAIL__MANAGER__CLASSIFY";
export const FETCH__DETAIL__MANAGER__CLASSIFY__SC =
  "FETCH__DETAIL__MANAGER__CLASSIFY__SC";
export const FETCH__DETAIL__MANAGER__CLASSIFY__FL =
  "FETCH__DETAIL__MANAGER__CLASSIFY__FL";

export const fetchDetailManagerClassify = (data) => ({
  type: FETCH__DETAIL__MANAGER__CLASSIFY,
  payload: data,
});

export const fetchDetailManagerClassifySuccess = (data) => ({
  type: FETCH__DETAIL__MANAGER__CLASSIFY__SC,
  payload: data,
});

export const fetchDetailManagerClassifyFail = (error) => ({
  type: FETCH__DETAIL__MANAGER__CLASSIFY__FL,
  payload: error,
});

// REDUCER
const initialState = {
  detailManagerClassify: [],
  loading: false,
  error: null,
};

const getDetailManagerClassifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__DETAIL__MANAGER__CLASSIFY:
      return { ...state, loading: true, error: null };
    case FETCH__DETAIL__MANAGER__CLASSIFY__SC:
      return {
        ...state,
        loading: false,
        detailManagerClassify: action.payload,
      };
    case FETCH__DETAIL__MANAGER__CLASSIFY__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getDetailManagerClassifyReducer;
