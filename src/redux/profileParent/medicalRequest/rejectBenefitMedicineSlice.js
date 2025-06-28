export const FETCH_REJECT_BENEFIT_MEDICINE = "FETCH_REJECT_BENEFIT_MEDICINE";
export const FETCH_REJECT_BENEFIT_MEDICINE_SUCCESS =
  "FETCH_REJECT_BENEFIT_MEDICINE_SUCCESS";
export const FETCH_REJECT_BENEFIT_MEDICINE_FAIL =
  "FETCH_REJECT_BENEFIT_MEDICINE_FAIL";

export const fetchRejectBenefitMedicine = (data) => ({
  type: FETCH_REJECT_BENEFIT_MEDICINE,
  payload: data,
});

export const fetchRejectBenefitMedicineSuccess = (data) => ({
  type: FETCH_REJECT_BENEFIT_MEDICINE_SUCCESS,
  payload: data,
});

export const fetchRejectBenefitMedicineFail = (error) => ({
  type: FETCH_REJECT_BENEFIT_MEDICINE_FAIL,
  payload: error,
});

const initialState = {
  reject: [],
  loading: false,
  error: null,
};

const rejectBenefitMedicineReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REJECT_BENEFIT_MEDICINE:
      return { ...state, loading: true, error: null };
    case FETCH_REJECT_BENEFIT_MEDICINE_SUCCESS:
      return { ...state, loading: false, reject: action.payload.data };
    case FETCH_REJECT_BENEFIT_MEDICINE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default rejectBenefitMedicineReducer;
