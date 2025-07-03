export const FETCH_DETAIL_ACCOUNT = "FETCH_DETAIL_ACCOUNT";
export const FETCH_DETAIL_ACCOUNT_SUCCESS = "FETCH_DETAIL_ACCOUNT_SUCCESS";
export const FETCH_DETAIL_ACCOUNT_FAIL = "FETCH_DETAIL_ACCOUNT_FAIL";

export const fetchDetailAccount = (data) => ({
  type: FETCH_DETAIL_ACCOUNT,
  payload: data,
});

export const fetchDetailAccountSuccess = (data) => ({
  type: FETCH_DETAIL_ACCOUNT_SUCCESS,
  payload: data,
});

export const fetchDetailAccountFail = (error) => ({
  type: FETCH_DETAIL_ACCOUNT_FAIL,
  payload: error,
});

const initialState = {
  detail: null,
  loading: false,
  error: null,
};

const detailAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DETAIL_ACCOUNT:
      return { ...state, loading: true, error: null };
    case FETCH_DETAIL_ACCOUNT_SUCCESS:
      return { ...state, loading: false, detail: action.payload };
    case FETCH_DETAIL_ACCOUNT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default detailAccountReducer;
