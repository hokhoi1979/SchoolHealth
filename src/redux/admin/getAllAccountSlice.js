export const FETCH_ALL_ACCOUNT = "FETCH_ALL_ACCOUNT";
export const FETCH_ALL_ACCOUNT_SUCCESS = "FETCH_ALL_ACCOUNT_SUCCESS";
export const FETCH_ALL_ACCOUNT_FAIL = "FETCH_ALL_ACCOUNT_FAIL";

export const fetchAllAccount = (data) => ({
  type: FETCH_ALL_ACCOUNT,
  payload: data,
});

export const fetchAllAccountSuccess = (data) => ({
  type: FETCH_ALL_ACCOUNT_SUCCESS,
  payload: data,
});

export const fetchAllAccountFail = (error) => ({
  type: FETCH_ALL_ACCOUNT_FAIL,
  payload: error,
});

const initialState = {
  accounts: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  loading: false,
  error: null,
};

const getAllAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_ACCOUNT:
      return { ...state, loading: true, error: null };
    case FETCH_ALL_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: action.payload.accounts,
        pagination: action.payload.pagination,
      };
    case FETCH_ALL_ACCOUNT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default getAllAccountReducer;
