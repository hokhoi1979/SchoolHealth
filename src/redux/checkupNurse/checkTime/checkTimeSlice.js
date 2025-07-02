export const CHECK__TIME = "CHECK__TIME";
export const CHECK__TIME__SUCCESS = "CHECK__TIME__SUCCESS";
export const CHECK__TIME__FAIL = "CHECK__TIME__FAIL";

export const checkTime = (data) => ({
  type: CHECK__TIME,
  payload: data,
});

export const checkTimeSuccess = (data) => ({
  type: CHECK__TIME__SUCCESS,
  payload: data,
});

export const checkTimeFail = (error) => ({
  type: CHECK__TIME__FAIL,
  payload: error,
});

const initialState = {
  time: [],
  loading: false,
  error: null,
};

const checkScheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK__TIME:
      return { ...state, loading: true, error: null };
    case CHECK__TIME__SUCCESS:
      return { ...state, loading: false, time: action.payload };
    case CHECK__TIME__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default checkScheduleReducer;
