export const FETCH_MEETING_PARENT = "FETCH_MEETING_PARENT";
export const FETCH_MEETING_PARENT_SUCCESS = "FETCH_MEETING_PARENT_SUCCESS";
export const FETCH_MEETING_PARENT_FAIL = "FETCH_MEETING_PARENT_FAIL";

export const fetchMeetingParent = (data) => ({
  type: FETCH_MEETING_PARENT,
  payload: data,
});

export const fetchMeetingParentSuccess = (data) => ({
  type: FETCH_MEETING_PARENT_SUCCESS,
  payload: data,
});

export const fetchMeetingParentFail = (error) => ({
  type: FETCH_MEETING_PARENT,
  payload: error,
});

const initialState = {
  meeting: [],
  loading: false,
  error: null,
};

const meetingParentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEETING_PARENT:
      return { ...state, loading: true, error: null };
    case FETCH_MEETING_PARENT_SUCCESS:
      return { ...state, loading: false, meeting: action.payload };
    case FETCH_MEETING_PARENT:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default meetingParentReducer;
