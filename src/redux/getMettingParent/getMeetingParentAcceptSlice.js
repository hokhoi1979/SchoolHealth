export const FETCH_ACCEPT_MEETING = "FETCH_ACCEPT_MEETING";
export const FETCH_ACCEPT_MEETING_SUCCESS = "FETCH_ACCEPT_MEETING_SUCCESS";
export const FETCH_ACCEPT_MEETING_FAIL = "FETCH_ACCEPT_MEETING_FAIL";

export const fetchAcceptMeeting = (data) => ({
  type: FETCH_ACCEPT_MEETING,
  payload: data,
});

export const fetchAcceptMeetingSuccess = (data) => ({
  type: FETCH_ACCEPT_MEETING_SUCCESS,
  payload: data,
});

export const fetchAcceptMeetingFail = (error) => ({
  type: FETCH_ACCEPT_MEETING_FAIL,
  payload: error,
});

const initialState = {
  student: [],
  loading: false,
  error: null,
};

const getMeetingParentAcceptReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCEPT_MEETING:
      return { ...state, loading: true, error: null };
    case FETCH_ACCEPT_MEETING_SUCCESS:
      return { ...state, loading: false, student: action.payload };
    case FETCH_ACCEPT_MEETING_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default getMeetingParentAcceptReducer;
