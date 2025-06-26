export const FETCH_DETAIL_REQUEST = "FETCH_DETAIL_REQUEST";
export const FETCH_DETAIL_REQUEST_SUCCESS = "FETCH_DETAIL_REQUEST_SUCCESS";
export const FETCH_DETAIL_REQUEST_FAIL = "FETCH_DETAIL_REQUEST_FAIL";

export const fetchDetailRequest = (data) => ({
  type: FETCH_DETAIL_REQUEST,
  payload: data,
});

export const fetchDetailRequestSuccess = (data) => ({
  type: FETCH_DETAIL_REQUEST_SUCCESS,
  payload: data,
});

export const fetchDetailRequestFail = (error) => ({
  type: FETCH_DETAIL_REQUEST_FAIL,
  payload: error,
});

const initialState = {
  requestDetail: null,
  loading: false,
  error: null,
};

const getDetailRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DETAIL_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_DETAIL_REQUEST_SUCCESS:
      return { ...state, loading: false, requestDetail: action.payload.data };
    case FETCH_DETAIL_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        requestDetail: null,
      };
    default:
      return state;
  }
};
export default getDetailRequestReducer;
