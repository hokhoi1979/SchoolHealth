export const CREATE__MEETING = "CREATE__MEETING";
export const CREATE__MEETING__SUCCESS = "CREATE__MEETING__SUCCESS";
export const CREATE__MEETING__FAIL = "CREATE__MEETING__FAIL";

export const createMeeting = (data) => ({
  type: CREATE__MEETING,
  payload: data,
});

export const createMeetingSuccess = (data) => ({
  type: CREATE__MEETING__SUCCESS,
  payload: data,
});

export const createMeetingFail = (error) => ({
  type: CREATE__MEETING__FAIL,
  payload: error,
});

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const createMeetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE__MEETING:
      return { ...state, loading: true, error: null };
    case CREATE__MEETING__SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case CREATE__MEETING__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default createMeetingReducer;
