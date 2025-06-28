export const FETCH_STOP_MEDICINE = "FETCH_STOP_MEDICINE";
export const FETCH_STOP_MEDICINE_SUCCESS = "FETCH_STOP_MEDICINE_SUCCESS";
export const FETCH_STOP_MEDICINE_FAIL = "FETCH_STOP_MEDICINE_FAIL";

export const fetchStopMedicine = (data) => ({
  type: FETCH_STOP_MEDICINE,
  payload: data,
});

export const fetchStopMedicineSuccess = (data) => ({
  type: FETCH_STOP_MEDICINE_SUCCESS,
  payload: data,
});

export const fetchStopMedicineFail = (error) => ({
  type: FETCH_STOP_MEDICINE_FAIL,
  payload: error,
});

const initialState = {
  stop: [],
  loading: false,
  error: null,
};

const stopMedicineReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STOP_MEDICINE:
      return { ...state, loading: true, error: null };
    case FETCH_STOP_MEDICINE_SUCCESS:
      return { ...state, loading: false, stop: action.payload.data };
    case FETCH_STOP_MEDICINE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default stopMedicineReducer;
