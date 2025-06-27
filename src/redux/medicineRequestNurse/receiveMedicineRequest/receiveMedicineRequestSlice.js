export const RECEIVE__MEDICINE__REQUEST = "RECEIVE__MEDICINE__REQUEST";
export const RECEIVE__MEDICINE__REQUEST__SUCCESS =
  "RECEIVE__MEDICINE__REQUEST__SUCCESS";
export const RECEIVE__MEDICINE__REQUEST__FAIL =
  "RECEIVE__MEDICINE__REQUEST__FAIL";

export const receiveMedicineRequest = (data) => ({
  type: RECEIVE__MEDICINE__REQUEST,
  payload: data,
});

export const receiveMedicineRequestSuccess = (data) => ({
  type: RECEIVE__MEDICINE__REQUEST__SUCCESS,
  payload: data,
});

export const receiveMedicineRequestFail = (error) => ({
  type: RECEIVE__MEDICINE__REQUEST__FAIL,
  payload: error,
});

const initialState = {
  receiveMedicineRequest: [],
  loading: false,
  error: null,
};

const receiveMedicineRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE__MEDICINE__REQUEST:
      return { ...state, loading: true, error: null };
    case RECEIVE__MEDICINE__REQUEST__SUCCESS:
      return {
        ...state,
        loading: false,
        receiveMedicineRequest: action.payload,
      };
    case RECEIVE__MEDICINE__REQUEST__FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default receiveMedicineRequestReducer;
