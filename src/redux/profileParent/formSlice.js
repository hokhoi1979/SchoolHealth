export const FETCH__FORM = "FETCH_FORM";
export const FETCH__FORM__SUCCESS = "FETCH_FORM_SUCCESS";
export const FETCH__FORM__FAIL = "FETCH_FORM_FAIL";

export const fetchForm = (data) => ({
  type: FETCH__FORM,
  payload: data,
});

export const fetchFormSuccess = (data) => ({
  type: FETCH__FORM__SUCCESS,
  payload: data,
});

export const fetchFormFail = (data) => ({
  type: FETCH__FORM__FAIL,
  payload: data,
});

const initialState = {
  parent: [],
  loading: false,
  error: null,
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__FORM:
      return { ...state, loading: true, error: null };
    case FETCH__FORM__SUCCESS:
      return { ...state, loading: false, student: action.payload };
    case FETCH__FORM__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default formReducer;
