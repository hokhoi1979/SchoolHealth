export const FETCH__ALL__REQUEST = "FETCH__ALL__REQUEST";
export const FETCH__ALL__REQUEST__SC = "FETCH__ALL__REQUEST__SC";
export const FETCH__ALL__REQUEST__FL = "FETCH__ALL__REQUEST__FL";

export const fetchAllRequest = (data) => ({
  type: FETCH__ALL__REQUEST,
  payload: data,
});

export const fetchAllRequestSuccess = (data) => ({
  type: FETCH__ALL__REQUEST__SC,
  payload: data,
});

export const fetchAllRequestFail = (error) => ({
  type: FETCH__ALL__REQUEST__FL,
  payload: error,
});

const initialState = {
  allRequest: [],
  loading: false,
  error: null,
};

const getAllRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__ALL__REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH__ALL__REQUEST__SC:
      return {
        ...state,
        loading: false,
        allRequest: action.payload,
      };
    case FETCH__ALL__REQUEST__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getAllRequestReducer;
