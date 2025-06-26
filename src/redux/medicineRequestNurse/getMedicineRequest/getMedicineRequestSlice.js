export const FETCH__MEDICINE__REQUEST = "FETCH__MEDICINE__REQUEST";
export const FETCH__MEDICINE__REQUEST__SUCCESS =
  "FETCH__MEDICINE__REQUEST__SUCCESS";
export const FETCH__MEDICINE__REQUEST__FAIL = "FETCH__MEDICINE__REQUEST__FAIL";

export const fetchMedicineRequest = (data) => ({
  type: FETCH__MEDICINE__REQUEST,
  payload: data,
});

export const fetchMedicineRequestSuccess = (data) => ({
  type: FETCH__MEDICINE__REQUEST__SUCCESS,
  payload: data,
});

export const fetchMedicineRequestFail = (error) => ({
  type: FETCH__MEDICINE__REQUEST__FAIL,
  payload: error,
});

const initialState = {
  getMedicineRequest: [],
  loading: false,
  error: null,
};

const medicineRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__MEDICINE__REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH__MEDICINE__REQUEST__SUCCESS:
      return { ...state, loading: false, getMedicineRequest: action.payload };
    case FETCH__MEDICINE__REQUEST__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default medicineRequestReducer;
