export const CREATE__STUDENT__ADMIN = "CREATE__STUDENT__ADMIN";
export const CREATE__STUDENT__ADMIN__SC = "CREATE__STUDENT__ADMIN__SC";
export const CREATE__STUDENT__ADMIN__FL = "CREATE__STUDENT__ADMIN__FL";

// Action Creators
export const createStudentAdmin = (payload) => ({
  type: CREATE__STUDENT__ADMIN,
  payload,
});

export const createStudentAdminSuccess = (payload) => ({
  type: CREATE__STUDENT__ADMIN__SC,
  payload,
});

export const createStudentAdminFail = (error) => ({
  type: CREATE__STUDENT__ADMIN__FL,
  payload: error,
});

// Initial State
const initialState = {
  createdStudent: null,
  loading: false,
  error: null,
};

// Reducer
const createInformationStudentAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE__STUDENT__ADMIN:
      return { ...state, loading: true, error: null };
    case CREATE__STUDENT__ADMIN__SC:
      return { ...state, loading: false, createdStudent: action.payload };
    case CREATE__STUDENT__ADMIN__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default createInformationStudentAdminReducer;
