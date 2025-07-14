export const FETCH_CREATE_MEDICINE = "FETCH_CREATE_MEDICINE";
export const FETCH_CREATE_MEDICINE_SUCCESS = "FETCH_CREATE_MEDICINE_SUCCESS";
export const FETCH_CREATE_MEDICINE_FAIL = "FETCH_CREATE_MEDICINE_FAIL";

export const fetchCreateMedicine = (data) => ({
  type: FETCH_CREATE_MEDICINE,
  payload: data,
});

export const fetchCreateMedicineSuccess = (data) => ({
  type: FETCH_CREATE_MEDICINE_SUCCESS,
  payload: data,
});

export const fetchCreateMedicineFail = (error) => ({
  type: FETCH_CREATE_MEDICINE_FAIL,
  payload: error,
});

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const createMedicineReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CREATE_MEDICINE:
      return { ...state, loading: true, error: null };
    case FETCH_CREATE_MEDICINE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_CREATE_MEDICINE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default createMedicineReducer;
