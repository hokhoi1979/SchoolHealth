export const FETCH__REQUEST__MEDICINE = "FETCH__REQUEST__MEDICINE";
export const FETCH__REQUEST__MEDICINE__SUCCESS =
  "FETCH__REQUEST__MEDICINE__SUCCESS";
export const FETCH__REQUEST__MEDICINE__FAIL = "FETCH__REQUEST__MEDICINE__FAIL";

export const fetchRequestMedicine = (data) => ({
  type: FETCH__REQUEST__MEDICINE,
  payload: data,
});

export const fetchRequestMedicineSuccess = (data) => ({
  type: FETCH__REQUEST__MEDICINE__SUCCESS,
  payload: data,
});

export const fetchRequestMedicineFail = (error) => ({
  type: FETCH__REQUEST__MEDICINE__FAIL,
  payload: error,
});

const initialState = {
  requestMedicine: [],
  loading: false,
  error: null,
};

const getRequestMedicineReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__REQUEST__MEDICINE:
      return { ...state, loading: true, error: null };
    case FETCH__REQUEST__MEDICINE__SUCCESS:
      return { ...state, loading: false, requestMedicine: action.payload };
    case FETCH__REQUEST__MEDICINE__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getRequestMedicineReducer;
