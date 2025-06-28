export const SEND__MEDICAL__EVENT = "SEND__MEDICAL__EVENT";
export const SEND__MEDICAL__EVENT__SUCCESS = "SEND__MEDICAL__EVENT__SUCCESS";
export const SEND__MEDICAL__EVENT__FAIL = "SEND__MEDICAL__EVENT__FAIL";

export const sendMedicalEvent = (data) => ({
  type: SEND__MEDICAL__EVENT,
  payload: data,
});

export const sendMedicalEventSuccess = (data) => ({
  type: SEND__MEDICAL__EVENT__SUCCESS,
  payload: data,
});

export const sendMedicalEventFail = (error) => ({
  type: SEND__MEDICAL__EVENT__FAIL,
  payload: error,
});

const initialState = {
  sendMedicalEventParent: [],
  loading: false,
  error: null,
};

const sendMedicalEnventReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND__MEDICAL__EVENT:
      return { ...state, loading: true, error: null };
    case SEND__MEDICAL__EVENT__SUCCESS:
      return {
        ...state,
        loading: false,
        sendMedicalEventParent: action.payload,
      };
    case SEND__MEDICAL__EVENT__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default sendMedicalEnventReducer;
