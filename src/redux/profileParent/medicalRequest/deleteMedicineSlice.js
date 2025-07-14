export const FETCH_DELETE_MEDICINE = "FETCH_DELETE_MEDICINE";
export const FETCH_DELETE_MEDICINE_SUCCESS = "FETCH_DELETE_MEDICINE_SUCCESS";
export const FETCH_DELETE_MEDICINE_FAIL = "FETCH_DELETE_MEDICINE_FAIL";

export const fetchDeleteMedicine = (data) => ({
  type: FETCH_DELETE_MEDICINE,
  payload: data,
});

export const fetchDeleteMedicineSuccess = (data) => ({
  type: FETCH_DELETE_MEDICINE_SUCCESS,
  payload: data,
});

export const fetchDeleteMedicineFail = (error) => ({
  type: FETCH_DELETE_MEDICINE_FAIL,
  payload: error,
});

const initialState = {
  data: [],
  loading: false,
  error: null,
  success: false, // ✅ Thêm biến success
};

const deleteMedicineReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DELETE_MEDICINE:
      return { ...state, loading: true, error: null, success: false };
    case FETCH_DELETE_MEDICINE_SUCCESS:
      return { ...state, loading: false, data: action.payload, success: true };
    case FETCH_DELETE_MEDICINE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export default deleteMedicineReducer;
