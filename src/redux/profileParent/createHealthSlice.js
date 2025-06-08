export const FETCH__CREATE__HEALTH = "FETCH__CREATE__HEALTH";
export const FETCH__CREATE__HEALTH__SUCCESS = "FETCH__CREATE__HEALTH__SUCCESS";
export const FETCH__CREATE__HEALTH__FAIL = "FETCH__CREATE__HEALTH__FAIL";

export const fetchCreateHealth = (data) => ({
  type: FETCH__CREATE__HEALTH,
  payload: data,
});

export const fetchCreateHealthSucess = (data) => ({
  type: FETCH__CREATE__HEALTH__SUCCESS,
  payload: data,
});

export const fetchCreateHealthFail = (error) => ({
  type: FETCH__CREATE__HEALTH__FAIL,
  payload: error,
});

const initialState = {
  parent: [],
  loading: false,
  error: null,
};

const createHealthReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__CREATE__HEALTH:
      return { ...state, loading: true, error: null };
    case FETCH__CREATE__HEALTH__SUCCESS:
      return { ...state, loading: false, student: action.payload };
    case FETCH__CREATE__HEALTH__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default createHealthReducer;
