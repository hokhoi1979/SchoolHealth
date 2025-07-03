export const FETCH_DETAIL_VACCINE = "FETCH_DETAIL_VACCINE";
export const FETCH_DETAIL_VACCINE_SUCCESS = "FETCH_DETAIL_VACCINE_SUCCESS";
export const FETCH_DETAIL_VACCINE_FAIL = "FETCH_DETAIL_VACCINE_FAIL";

export const fetchDetailVaccine = (data) => ({
  type: FETCH_DETAIL_VACCINE,
  payload: data,
});

export const fetchDetailVaccineSuccess = (data) => ({
  type: FETCH_DETAIL_VACCINE_SUCCESS,
  payload: data,
});

export const fetchDetailVaccineFail = (error) => ({
  type: FETCH_DETAIL_VACCINE_FAIL,
  payload: error,
});

const initialState = {
  vaccine: null,
  loading: false,
  error: null,
};

const getDetailVaccineManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DETAIL_VACCINE:
      return { ...state, loading: true, error: null };
    case FETCH_DETAIL_VACCINE_SUCCESS:
      return { ...state, loading: false, vaccine: action.payload };
    case FETCH_DETAIL_VACCINE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default getDetailVaccineManagerReducer;
