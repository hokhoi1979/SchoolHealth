export const COMPLETE__MEETING = "COMPLETE__MEETING";
export const COMPLETE__MEETING__SUCCESS = "COMPLETE__MEETING__SUCCESS";
export const COMPLETE__MEETING__FAIL = "COMPLETE__MEETING__FAIL";

export const completeMeeting = (data) => ({
  type: COMPLETE__MEETING,
  payload: data,
});

export const completeMeetingSuccess = (data) => ({
  type: COMPLETE__MEETING__SUCCESS,
  payload: data,
});

export const completeMeetingFail = (error) => ({
  type: COMPLETE__MEETING__FAIL,
  payload: error,
});

const initialState = {
  complete: [],
  loading: false,
  error: null,
};

const completeMeetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPLETE__MEETING:
      return { ...state, loading: true, error: null };
    case COMPLETE__MEETING__SUCCESS:
      return { ...state, loading: false, complete: action.payload };
    case COMPLETE__MEETING__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default completeMeetingReducer;
