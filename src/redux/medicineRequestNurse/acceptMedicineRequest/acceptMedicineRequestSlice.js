export const ACCEPT__MEDICINE__REQUEST = "ACCEPT__MEDICINE__REQUEST";
export const ACCEPT__MEDICINE__REQUEST__SUCCESS =
  "ACCEPT__MEDICINE__REQUEST__SUCCESS";
export const ACCEPT__MEDICINE__REQUEST__FAIL =
  "ACCEPT__MEDICINE__REQUEST__FAIL";

export const acceptMedicineRequest = (data) => ({
  type: ACCEPT__MEDICINE__REQUEST,
  payload: data,
});

export const acceptMedicineRequestSuccess = (data) => ({
  type: ACCEPT__MEDICINE__REQUEST__SUCCESS,
  payload: data,
});

export const acceptMedicineRequestFail = (error) => ({
  type: ACCEPT__MEDICINE__REQUEST__FAIL,
  payload: error,
});

const initialState = {
  acceptMedicineRequest: [],
  loading: false,
  error: null,
};

const acceptMedicineRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCEPT__MEDICINE__REQUEST:
      return { ...state, loading: true, error: null };
    case ACCEPT__MEDICINE__REQUEST__SUCCESS:
      return {
        ...state,
        loading: false,
        acceptMedicineRequest: action.payload,
      };
    case ACCEPT__MEDICINE__REQUEST__FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default acceptMedicineRequestReducer;
