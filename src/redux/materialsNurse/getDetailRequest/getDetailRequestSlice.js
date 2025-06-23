export const FETCH__REQUEST__DETAIL = "FETCH__REQUEST__DETAIL";

export const FETCH__REQUEST__DETAIL__SUCCESS =
  "FETCH__REQUEST__DETAIL__SUCCESS";

export const FETCH__REQUEST__DETAIL__FAIL = "FETCH__REQUEST__DETAIL__FAIL";

export const fetchRequestDetail = (data) => ({
  type: FETCH__REQUEST__DETAIL,
  payload: data,
});

export const fetchRequestDetailSuccess = (data) => ({
  type: FETCH__REQUEST__DETAIL__SUCCESS,
  payload: data,
});

export const fetchRequestDetailFail = (error) => ({
  type: FETCH__REQUEST__DETAIL__FAIL,
  payload: error,
});

const initialState = {
  detailRequest: [],
  loading: false,
  error: null,
};

const getRequestDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__REQUEST__DETAIL:
      return { ...state, loading: true, error: null };
    case FETCH__REQUEST__DETAIL__SUCCESS:
      return { ...state, loading: false, detailRequest: action.payload };
    case FETCH__REQUEST__DETAIL__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getRequestDetailReducer;
