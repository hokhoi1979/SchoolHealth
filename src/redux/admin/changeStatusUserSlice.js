export const CHANGE_STATUS_USER = "CHANGE_STATUS_USER";
export const CHANGE_STATUS_USER_SUCCESS = "CHANGE_STATUS_USER_SUCCESS";
export const CHANGE_STATUS_USER_FAIL = "CHANGE_STATUS_USER_FAIL";

export const fetchChangeStatusUser = (data) => ({
  type: CHANGE_STATUS_USER,
  payload: data,
});

export const fetchChangeStatusUserSuccess = (data) => ({
  type: CHANGE_STATUS_USER_SUCCESS,
  payload: data,
});

export const fetchChangeStatusUserFail = (error) => ({
  type: CHANGE_STATUS_USER_FAIL,
  payload: error,
});

const initialState = {
  status: [],
  loading: false,
  error: null,
};

const changeStatusUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_STATUS_USER:
      return { ...state, loading: true, error: null };
    case CHANGE_STATUS_USER_SUCCESS:
      return { ...state, loading: false, status: action.payload };
    case CHANGE_STATUS_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default changeStatusUserReducer;
