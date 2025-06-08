export const FETCH__HEALTH__STUDENT = "FETCH__HEALTH__STUDENT";
export const FETCH__HEALTH__STUDENT__SUCCESS =
  "FETCH__HEALTH__STUDENT__SUCCESS";
export const FETCH__HEALTH__STUDENT__FAIL = "FETCH__HEALTH__STUDENT__FAIL";

export const fetchHealth = (data) => ({
  type: FETCH__HEALTH__STUDENT,
  payload: data,
});

export const fetchHealthStudentSucess = (data) => ({
  type: FETCH__HEALTH__STUDENT__SUCCESS,
  payload: data,
});

export const fetchHealthStudentFail = (error) => ({
  type: FETCH__HEALTH__STUDENT__FAIL,
  payload: error,
});

const initialState = {
  student: [],
  loading: false,
  error: null,
};

const healthStudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__HEALTH__STUDENT:
      return { ...state, loading: true, error: null };
    case FETCH__HEALTH__STUDENT__SUCCESS:
      return { ...state, loading: false, student: action.payload };
    case FETCH__HEALTH__STUDENT__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default healthStudentReducer;
