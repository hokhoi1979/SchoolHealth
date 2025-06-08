export const FETCH_STUDENT = "FETCH_STUDENT";
export const FETCH_STUDENT_SUCCESS = "FETCH_STUDENT_SUCCESS";
export const FETCH_STUDENT_FAIL = "FETCH_STUDENT_FAIL";

export const fetchStudent = (data) => ({
  type: FETCH_STUDENT,
  payload: data,
});

export const fetchStudentSuccess = (data) => ({
  type: FETCH_STUDENT_SUCCESS,
  payload: data,
});

export const fetchStudentFail = (data) => ({
  type: FETCH_STUDENT_FAIL,
  payload: data,
});

const initialState = {
  parent: [],
  loading: false,
  error: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENT:
      return { ...state, loading: true, error: null };
    case FETCH_STUDENT_SUCCESS:
      return { ...state, loading: false, student: action.payload };
    case FETCH_STUDENT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default studentReducer;
