export const DELETE__MEDICAL__EVENT = "DELETE__MEDICAL__EVENT";
export const DELETE__MEDICAL__EVENT__SUCCESS =
  "DELETE__MEDICAL__EVENT__SUCCESS";
export const DELETE__MEDICAL__EVENT__FAIL = "DELETE__MEDICAL__EVENT__FAIL";

export const deleteMedicalEvent = (data) => ({
  type: DELETE__MEDICAL__EVENT,
  payload: data,
});

export const deleteMedicalEventSuccess = (data) => ({
  type: DELETE__MEDICAL__EVENT__SUCCESS,
  payload: data,
});

export const deleteMedicalEventFail = (error) => ({
  type: DELETE__MEDICAL__EVENT__FAIL,
  payload: error,
});

const initialState = {
  deleteMedical: [],
  loading: false,
  error: null,
};

const deleteMedicalEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE__MEDICAL__EVENT:
      return { ...state, loading: true, error: null };
    case DELETE__MEDICAL__EVENT__SUCCESS:
      return { ...state, loading: false, deleteMedical: action.payload };
    case DELETE__MEDICAL__EVENT__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default deleteMedicalEventReducer;
