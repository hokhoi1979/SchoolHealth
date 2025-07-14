export const DELETE__MEETING = "DELETE__MEETING";
export const DELETE__MEETING__SUCCESS = "DELETE__MEETING__SUCCESS";
export const DELETE__MEETING__FAIL = "DELETE__MEETING__FAIL";

export const deleteMeeting = (data) => ({
  type: DELETE__MEETING,
  payload: data,
});

export const deleteMeetingSuccess = (data) => ({
  type: DELETE__MEETING__SUCCESS,
  payload: data,
});

export const deleteMeetingFail = (error) => ({
  type: DELETE__MEETING__FAIL,
  payload: error,
});

const initialState = {
  deleteMeet: [],
  loading: false,
  error: null,
};

const deleteMeetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE__MEETING:
      return { ...state, loading: true, error: null };
    case DELETE__MEETING__SUCCESS:
      return { ...state, loading: false, deleteMeet: action.payload };
    case DELETE__MEETING__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default deleteMeetingReducer;
