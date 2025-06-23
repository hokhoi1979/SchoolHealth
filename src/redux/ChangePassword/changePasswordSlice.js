export const FETCH_CHANGE_PASSWORD = "FETCH_CHANGE_PASSWORD";
export const FETCH_CHANGE_PASSWORD_SUCCESS = "FETCH_CHANGE_PASSWORD_SUCCESS";
export const FETCH_CHANGE_PASSWORD_FAIL = "FETCH_CHANGE_PASSWORD_FAIL";

export const fetchChangePassword = (data) => ({
  type: FETCH_CHANGE_PASSWORD,
  payload: data,
});

export const fetchChangePasswordSuccess = (data) => ({
  type: FETCH_CHANGE_PASSWORD_SUCCESS,
  payload: data,
});

export const fetchChangePasswordFail = (data) => ({
  type: FETCH_CHANGE_PASSWORD_FAIL,
  payload: error,
});

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const changePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHANGE_PASSWORD:
      return { ...state, loading: true, error: null };
    case FETCH_CHANGE_PASSWORD_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_CHANGE_PASSWORD_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default changePasswordReducer;
