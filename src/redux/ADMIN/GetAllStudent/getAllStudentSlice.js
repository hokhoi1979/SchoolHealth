// getAllStudentAdminSlice.js

export const FETCH__STUDENT__ADMIN = "FETCH__STUDENT__ADMIN";
export const FETCH__STUDENT__ADMIN__SC = "FETCH__STUDENT__ADMIN__SC";
export const FETCH__STUDENT__ADMIN__FL = "FETCH__STUDENT__ADMIN__FL";

export const fetchStudentAdmin = (data) => ({
  type: FETCH__STUDENT__ADMIN,
  payload: data,
});

export const fetchStudentAdminSuccess = (data) => ({
  type: FETCH__STUDENT__ADMIN__SC,
  payload: data,
});

export const fetchStudentAdminFail = (error) => ({
  type: FETCH__STUDENT__ADMIN__FL,
  payload: error,
});

const initialState = {
  studentAdminList: [],
  loading: false,
  error: null,
};

const getAllStudentAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__STUDENT__ADMIN:
      return { ...state, loading: true, error: null };
    case FETCH__STUDENT__ADMIN__SC:
      return {
        ...state,
        loading: false,
        studentAdminList: action.payload,
      };
    case FETCH__STUDENT__ADMIN__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getAllStudentAdminReducer;
