export const FETCH_DECLINE_MEETING = "FETCH_DECLINE_MEETING";
export const FETCH_DECLINE_MEETING_SUCCESS = "FETCH_DECLINE_MEETING_SUCCESS";
export const FETCH_DECLINE_MEETING_FAIL = "FETCH_DECLINE_MEETING_FAIL";

export const fetchDeclineMeeting = (data) => ({
  type: FETCH_DECLINE_MEETING,
  payload: data,
});

export const fetchDeclineMeetingSuccess = (data) => ({
  type: FETCH_DECLINE_MEETING_SUCCESS,
  payload: data,
});

export const fetchDeclineMeetingFail = (error) => ({
  type: FETCH_DECLINE_MEETING_FAIL,
  payload: error,
});

const initialState = {
  student: [],
  loading: false,
  error: null,
};

const getMeetingParentDeclineReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DECLINE_MEETING:
      return { ...state, loading: true, error: null };
    case FETCH_DECLINE_MEETING_SUCCESS:
      return { ...state, loading: false, student: action.payload };
    case FETCH_DECLINE_MEETING_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default getMeetingParentDeclineReducer;
