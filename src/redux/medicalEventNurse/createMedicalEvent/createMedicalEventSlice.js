export const POST__MEDICAL__EVENT = "POST__MEDICAL__EVENT";
export const POST__MEDICAL__EVENT__SUCCESS = "POST__MEDICAL__EVENT__SUCCESS";
export const POST__MEDICAL__EVENT__FAIL = "POST__MEDICAL__EVENT__FAIL";

export const postMedicalEvent = (data) => ({
  type: POST__MEDICAL__EVENT,
  payload: data,
});

export const postMedicalEventSuccess = (data) => ({
  type: POST__MEDICAL__EVENT__SUCCESS,
  payload: data,
});

export const postMedicalEventFail = (error) => ({
  type: POST__MEDICAL__EVENT__FAIL,
  payload: error,
});

const initialState = {
  createMedicalEvent: [],
  loading: false,
  error: null,
};

const createMedicalEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST__MEDICAL__EVENT:
      return { ...state, loading: true, error: null };
    case POST__MEDICAL__EVENT__SUCCESS:
      return { ...state, loading: false, createMedicalEvent: action.payload };
    case POST__MEDICAL__EVENT__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default createMedicalEventReducer;
