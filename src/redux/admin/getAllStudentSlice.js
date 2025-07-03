export const FETCH_ALL_STUDENT = "FETCH_ALL_STUDENT";
export const FETCH_ALL_STUDENT_SUCCESS = "FETCH_ALL_STUDENT_SUCCESS";
export const FETCH_ALL_STUDENT_FAIL = "FETCH_ALL_STUDENT_FAIL";

export const fetchAllStudent = (data) => ({
  type: FETCH_ALL_STUDENT,
  payload: data,
});

export const fetchAllStudentSuccess = (data) => ({
  type: FETCH_ALL_STUDENT_SUCCESS,
  payload: data,
});

export const fetchAllStudentFail = (error) => ({
  type: FETCH_ALL_STUDENT_FAIL,
  payload: error,
});

const initialState = {
  students: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  loading: false,
  error: null,
};

const getAllStudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_STUDENT:
      return { ...state, loading: true, error: null };
    case FETCH_ALL_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        students: action.payload.result,
        pagination: action.payload.pagination,
      };
    case FETCH_ALL_STUDENT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default getAllStudentReducer;
