export const FETCH__DETAIL__REQUEST = "FETCH__DETAIL__REQUEST";
export const FETCH__DETAIL__REQUEST__SC = "FETCH__DETAIL__REQUEST__SC";
export const FETCH__DETAIL__REQUEST__FL = "FETCH__DETAIL__REQUEST__FL";

export const fetchDetailRequest = (data) => ({
  type: FETCH__DETAIL__REQUEST,
  payload: data,
});

export const fetchDetailRequestSuccess = (data) => ({
  type: FETCH__DETAIL__REQUEST__SC,
  payload: data,
});

export const fetchDetailRequestFail = (error) => ({
  type: FETCH__DETAIL__REQUEST__FL,
  payload: error,
});

const initialState = {
  detailRequest: [],
  loading: false,
  error: null,
};

const getDetailRequestManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__DETAIL__REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH__DETAIL__REQUEST__SC:
      return {
        ...state,
        loading: false,
        detailRequest: action.payload,
      };
    case FETCH__DETAIL__REQUEST__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getDetailRequestManagerReducer;
