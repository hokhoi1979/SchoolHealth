export const FETCH_ACCEPT_BENEFIT_MEDICINE = "FETCH_ACCEPT_BENEFIT_MEDICINE";
export const FETCH_ACCEPT_BENEFIT_MEDICINE_SUCCESS =
  "FETCH_ACCEPT_BENEFIT_MEDICINE_SUCCESS";
export const FETCH_ACCEPT_BENEFIT_MEDICINE_FAIL =
  "FETCH_ACCEPT_BENEFIT_MEDICINE_FAIL";

export const fetchAcceptBenefitMedicine = (data) => ({
  type: FETCH_ACCEPT_BENEFIT_MEDICINE,
  payload: data,
});

export const fetchAcceptBenefitMedicineSuccess = (data) => ({
  type: FETCH_ACCEPT_BENEFIT_MEDICINE_SUCCESS,
  payload: data,
});

export const fetchAcceptBenefitMedicineFail = (error) => ({
  type: FETCH_ACCEPT_BENEFIT_MEDICINE_FAIL,
  payload: error,
});

const initialState = {
  accept: [],
  loading: false,
  error: null,
};

const acceptBenefitMedicineReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCEPT_BENEFIT_MEDICINE:
      return { ...state, loading: true, error: null };
    case FETCH_ACCEPT_BENEFIT_MEDICINE_SUCCESS:
      return { ...state, loading: false, accept: action.payload.data };
    case FETCH_ACCEPT_BENEFIT_MEDICINE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default acceptBenefitMedicineReducer;
