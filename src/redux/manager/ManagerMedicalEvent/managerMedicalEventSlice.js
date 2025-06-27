// Types
export const FETCH__MANAGER__MEDICAL__EVENT = "FETCH__MANAGER__MEDICAL__EVENT";
export const FETCH__MANAGER__MEDICAL__EVENT__SC =
  "FETCH__MANAGER__MEDICAL__EVENT__SC";
export const FETCH__MANAGER__MEDICAL__EVENT__FL =
  "FETCH__MANAGER__MEDICAL__EVENT__FL";

// Actions
export const fetchManagerMedicalEvent = (data) => ({
  type: FETCH__MANAGER__MEDICAL__EVENT,
  payload: data,
});

export const fetchManagerMedicalEventSuccess = (data) => ({
  type: FETCH__MANAGER__MEDICAL__EVENT__SC,
  payload: data,
});

export const fetchManagerMedicalEventFail = (error) => ({
  type: FETCH__MANAGER__MEDICAL__EVENT__FL,
  payload: error,
});

// Initial State
const initialState = {
  managerMedicalEvent: [],
  loading: false,
  error: null,
};

// Reducer
const getManagerMedicalEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__MANAGER__MEDICAL__EVENT:
      return { ...state, loading: true, error: null };
    case FETCH__MANAGER__MEDICAL__EVENT__SC:
      return {
        ...state,
        loading: false,
        managerMedicalEvent: action.payload,
      };
    case FETCH__MANAGER__MEDICAL__EVENT__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getManagerMedicalEventReducer;
