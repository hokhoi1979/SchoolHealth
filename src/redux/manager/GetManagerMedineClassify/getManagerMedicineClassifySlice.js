export const FETCH__MEDICINE__CLASSTIFY__MANAGER =
  "FETCH__MEDICINE__CLASSTIFY__MANAGER";
export const FETCH__MEDICINE__CLASSTIFY__MANAGER__SC =
  "FETCH__MEDICINE__CLASSTIFY__MANAGER__SC";
export const FETCH__MEDICINE__CLASSTIFY__MANAGER__FL =
  "FETCH__MEDICINE__CLASSTIFY__MANAGER__FL";

export const fetchMedicineClasstifyManager = (data) => ({
  type: FETCH__MEDICINE__CLASSTIFY__MANAGER,
  payload: data,
});

export const fetchMedicineClasstifyManagerSucess = (data) => ({
  type: FETCH__MEDICINE__CLASSTIFY__MANAGER__SC,
  payload: data,
});

export const fetchMedicineClasstifyManagerFail = (error) => ({
  type: FETCH__MEDICINE__CLASSTIFY__MANAGER__FL,
  payload: error,
});

const initialState = {
  medicineClasstifyManager: [],
  loading: false,
  error: null,
};

const getMedicineClasstifyManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__MEDICINE__CLASSTIFY__MANAGER:
      return { ...state, loading: true, error: null };
    case FETCH__MEDICINE__CLASSTIFY__MANAGER__SC:
      return {
        ...state,
        loading: false,
        medicineClasstifyManager: action.payload,
      };
    case FETCH__MEDICINE__CLASSTIFY__MANAGER__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getMedicineClasstifyManagerReducer;
