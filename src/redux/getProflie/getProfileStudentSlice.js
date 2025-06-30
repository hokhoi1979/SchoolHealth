export const FETCH_STUDENT_DETAIL = "FETCH_STUDENT_DETAIL";
export const FETCH_STUDENT_DETAIL_SUCCESS = "FETCH_STUDENT_DETAIL_SUCCESS";
export const FETCH_STUDENT_DETAIL_FAIL = "FETCH_STUDENT_DETAIL_FAIL";

export const fetchStudentDetail = (data) => ({
  type: FETCH_STUDENT_DETAIL,
  payload: data,
});

export const fetchStudentDetailSuccess = (data) => ({
  type: FETCH_STUDENT_DETAIL_SUCCESS,
  payload: data,
});

export const fetchStudentDetailFail = (error) => ({
  type: FETCH_STUDENT_DETAIL_FAIL,
  payload: error,
});

const initialState = {
  student: [],
  loading: false,
  error: null,
};

const studentDetailProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENT_DETAIL:
      return { ...state, loading: true, error: null };
    case FETCH_STUDENT_DETAIL_SUCCESS:
      return { ...state, loading: false, student: action.payload };
    case FETCH_STUDENT_DETAIL_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default studentDetailProfileReducer;
