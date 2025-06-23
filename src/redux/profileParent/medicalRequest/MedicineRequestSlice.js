export const FETCH_MEDICINE_REQUEST = "FETCH_MEDICINE_REQUEST";
export const FETCH_MEDICINE_REQUEST_SUCCESS = "FETCH_MEDICINE_REQUEST_SUCCESS";
export const FETCH_MEDICINE_REQUEST_FAIL = "FETCH_MEDICINE_REQUEST_FAIL";

export const fetchMedicineRequest = (data) => ({
  type: FETCH_MEDICINE_REQUEST,
  payload: data,
});

export const fetchMedicineRequestSuccess = (data) => ({
  type: FETCH_MEDICINE_REQUEST_SUCCESS,
  payload: data,
});

export const fetchMedicineRequestFail = (data) => ({
  type: FETCH_MEDICINE_REQUEST_FAIL,
  payload: data,
});

const initialState = {
  medicine: [],
  loading: false,
  error: null,
};

const getMedicineRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEDICINE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MEDICINE_REQUEST_SUCCESS:
      return { ...state, loading: false, medicine: action.payload.data };
    case FETCH_MEDICINE_REQUEST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default getMedicineRequestReducer;
