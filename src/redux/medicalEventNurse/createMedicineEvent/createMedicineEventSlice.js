export const POST__MEDICINE__EVENT = "POST__MEDICINE__EVENT";
export const POST__MEDICINE__EVENT__SUCCESS = "POST__MEDICINE__EVENT__SUCCESS";
export const POST__MEDICINE__EVENT__FAIL = "POST__MEDICINE__EVENT__FAIL";

export const postMedicineEvent = (data) => ({
  type: POST__MEDICINE__EVENT,
  payload: data,
});

export const postMedicineEventSuccess = (data) => ({
  type: POST__MEDICINE__EVENT__SUCCESS,
  payload: data,
});

export const postMedicineEventFail = (error) => ({
  type: POST__MEDICINE__EVENT__FAIL,
  payload: error,
});

const initialState = {
  createMedicineEvent: [],
  loading: false,
  error: null,
};

const postMedicineEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST__MEDICINE__EVENT:
      return { ...state, loading: true, error: null };
    case POST__MEDICINE__EVENT__SUCCESS:
      return { ...state, loading: false, createMedicineEvent: action.payload };
    case POST__MEDICINE__EVENT__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default postMedicineEventReducer;
