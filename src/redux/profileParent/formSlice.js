// actions
export const FETCH__FORM = "FETCH__FORM";
export const FETCH__FORM__SUCCESS = "FETCH__FORM__SUCCESS";
export const FETCH__FORM__FAIL = "FETCH__FORM__FAIL";

export const fetchForm = () => ({ type: FETCH__FORM });

export const fetchFormSuccess = (data) => ({
  type: FETCH__FORM__SUCCESS,
  payload: data,
});

export const fetchFormFail = (error) => ({
  type: FETCH__FORM__FAIL,
  payload: error,
});

// reducer
const initialState = {
  formData: {},
  loading: false,
  error: null,
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__FORM:
      return { ...state, loading: true, error: null };
    case FETCH__FORM__SUCCESS:
      return { ...state, loading: false, formData: action.payload };
    case FETCH__FORM__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default formReducer;
