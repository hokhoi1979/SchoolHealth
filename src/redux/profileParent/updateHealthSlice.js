export const FETCH__UPDATE__HEALTH = "FETCH__UPDATE__HEALTH";
export const FETCH__UPDATE__HEALTH__SUCCESS = "FETCH__UPDATE__HEALTH__SUCCESS";
export const FETCH__UPDATE__HEALTH__FAIL = "FETCH__UPDATE__HEALTH__FAIL";

export const fetchUpdateHealth = (data) => ({
  type: FETCH__UPDATE__HEALTH,
  payload: data,
});

export const fetchUpdateHealthSucess = (data) => ({
  type: FETCH__UPDATE__HEALTH__SUCCESS,
  payload: data,
});

export const fetchUpdateHealthFail = (error) => ({
  type: FETCH__UPDATE__HEALTH__FAIL,
  payload: error,
});

const initialState = {
  student: [],
  loading: false,
  error: null,
};

const updateHealthReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__UPDATE__HEALTH:
      return { ...state, loading: true, error: null };
    case FETCH__UPDATE__HEALTH__SUCCESS:
      return { ...state, loading: false, student: action.payload };
    case FETCH__UPDATE__HEALTH__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default updateHealthReducer;
