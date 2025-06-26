export const REJECT__MEDICINE__REQUEST = "REJECT__MEDICINE__REQUEST";
export const REJECT__MEDICINE__REQUEST__SUCCESS =
  "REJECT__MEDICINE__REQUEST__SUCCESS";
export const REJECT__MEDICINE__REQUEST__FAIL =
  "REJECT__MEDICINE__REQUEST__FAIL";

export const rejectMedicineRequest = (data) => ({
  type: REJECT__MEDICINE__REQUEST,
  payload: data,
});

export const rejectMedicineRequestSuccess = (data) => ({
  type: REJECT__MEDICINE__REQUEST__SUCCESS,
  payload: data,
});

export const rejectMedicineRequestFail = (error) => ({
  type: REJECT__MEDICINE__REQUEST__FAIL,
  payload: error,
});

const initialState = {
  rejectMedicineRequest: [],
  loading: false,
  error: null,
};

const rejectMedicineRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case REJECT__MEDICINE__REQUEST:
      return { ...state, loading: true, error: null };
    case REJECT__MEDICINE__REQUEST__SUCCESS:
      return {
        ...state,
        loading: false,
        rejectMedicineRequest: action.payload,
      };
    case REJECT__MEDICINE__REQUEST__FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default rejectMedicineRequestReducer;
