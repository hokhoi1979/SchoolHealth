export const DELETE__STUDENT = "DELETE__STUDENT";
export const DELETE__STUDENT__SUCCESS = "DELETE__STUDENT__SUCCESS";
export const DELETE__STUDENT__FAIL = "DELETE__STUDENT__FAIL";

export const deleteStudent = (data) => ({
  type: DELETE__STUDENT,
  payload: data,
});

export const deleteStudentSuccess = (data) => ({
  type: DELETE__STUDENT__SUCCESS,
  payload: data,
});

export const deleteStudentFail = (error) => ({
  type: DELETE__STUDENT__FAIL,
  payload: error,
});

const initialState = {
  deleteStudent: [],
  loading: false,
  error: null,
};

const deleteStudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE__STUDENT:
      return { ...state, loading: true, error: null };
    case DELETE__STUDENT__SUCCESS:
      return { ...state, loading: false, deleteStudent: action.payload };
    case DELETE__STUDENT__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default deleteStudentReducer;
