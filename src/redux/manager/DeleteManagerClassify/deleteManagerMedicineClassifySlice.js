// Action Types
export const DELETE__MANAGER__MEDICINE_CLASSIFY =
  "DELETE__MANAGER__MEDICINE_CLASSIFY";
export const DELETE__MANAGER__MEDICINE_CLASSIFY__SC =
  "DELETE__MANAGER__MEDICINE_CLASSIFY__SC";
export const DELETE__MANAGER__MEDICINE_CLASSIFY__FL =
  "DELETE__MANAGER__MEDICINE_CLASSIFY__FL";

// Actions
export const deleteManagerMedicineClassify = (data) => ({
  type: DELETE__MANAGER__MEDICINE_CLASSIFY,
  payload: data,
});

export const deleteManagerMedicineClassifySuccess = (data) => ({
  type: DELETE__MANAGER__MEDICINE_CLASSIFY__SC,
  payload: data,
});

export const deleteManagerMedicineClassifyFail = (error) => ({
  type: DELETE__MANAGER__MEDICINE_CLASSIFY__FL,
  payload: error,
});

// Initial State
const initialState = {
  deletedMedicineClassify: [],
  loading: false,
  error: null,
};

// Reducer
const deleteManagerMedicineClassifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE__MANAGER__MEDICINE_CLASSIFY:
      return { ...state, loading: true, error: null };
    case DELETE__MANAGER__MEDICINE_CLASSIFY__SC:
      return {
        ...state,
        loading: false,
        deletedMedicineClassify: action.payload,
      };
    case DELETE__MANAGER__MEDICINE_CLASSIFY__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default deleteManagerMedicineClassifyReducer;
