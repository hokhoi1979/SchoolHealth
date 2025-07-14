export const FETCH__MANAGER__MEDICAL = "FETCH__MANAGER__MEDICAL";
export const FETCH__MANAGER__MEDICAL__SC = "FETCH__MANAGER__MEDICAL__SC";
export const FETCH__MANAGER__MEDICAL__FL = "FETCH__MANAGER__MEDICAL__FL";

export const fetchManagerMedical = (data) => ({
  type: FETCH__MANAGER__MEDICAL,
  payload: data,
});

export const fetchManagerSucessMedical = (data) => ({
  type: FETCH__MANAGER__MEDICAL__SC,
  payload: data,
});

export const fetchMangerFailMedical = (error) => ({
  type: FETCH__MANAGER__MEDICAL__FL,
  payload: error,
});
const initialState = {
  medical: [],
  loading: false,
  error: null,
};

const managerMedicalReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__MANAGER__MEDICAL:
      return { ...state, loading: true, error: null };
    case FETCH__MANAGER__MEDICAL__SC:
      return { ...state, loading: false, medical: action.payload };
    case FETCH__MANAGER__MEDICAL__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default managerMedicalReducer;
