export const STUDENT__MEETING = "STUDENT__MEETING";
export const STUDENT__MEETING__SUCCESS = "STUDENT__MEETING__SUCCESS";
export const STUDENT__MEETING__FAIL = "STUDENT__MEETING__FAIL";

export const studentMeeting = (data) => ({
  type: STUDENT__MEETING,
  payload: data,
});

export const studentMeetingSuccess = (data) => ({
  type: STUDENT__MEETING__SUCCESS,
  payload: data,
});

export const studentMeetingFail = (error) => ({
  type: STUDENT__MEETING__FAIL,
  payload: error,
});

const initialState = {
  meeting: [],
  loading: false,
  error: null,
};

const studentMeetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT__MEETING:
      return { ...state, loading: true, error: null };
    case STUDENT__MEETING__SUCCESS:
      return { ...state, loading: false, meeting: action.payload };
    case STUDENT__MEETING__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default studentMeetingReducer;
