export const POST__MANAGER__CLASSTIFY = "POST__MANAGER__CLASSTIFY";
export const POST__MANAGER__CLASSTIFY__SC = "POST__MANAGER__CLASSTIFY__SC";
export const POST__MANAGER__CLASSTIFY__FL = "POST__MANAGER__CLASSTIFY__FL";

export const postManagerClasstify = (data) => ({
  type: POST__MANAGER__CLASSTIFY,
  payload: data,
});

export const postManagerSuccessClasstify = (data) => ({
  type: POST__MANAGER__CLASSTIFY__SC,
  payload: data,
});

export const postManagerFailClasstify = (error) => ({
  type: POST__MANAGER__CLASSTIFY__FL,
  payload: error,
});

// INITIAL STATE
const initialState = {
  classtify: [],
  loading: false,
  error: null,
};

// REDUCER
const managerClasstifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST__MANAGER__CLASSTIFY:
      return { ...state, loading: true, error: null };
    case POST__MANAGER__CLASSTIFY__SC:
      return { ...state, loading: false, classtify: action.payload };
    case POST__MANAGER__CLASSTIFY__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default managerClasstifyReducer;
