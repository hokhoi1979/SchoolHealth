export const DELETE__MEDICINE__MANAGER = "DELETE__MEDICINE__MANAGER";
export const DELETE__MEDICINE__MANAGER__SC = "DELETE__MEDICINE__MANAGER__SC";
export const DELETE__MEDICINE__MANAGER__FL = "DELETE__MEDICINE__MANAGER__FL";

export const deleteMedicineManager = (payload) => ({
  type: DELETE__MEDICINE__MANAGER,
  payload,
});

export const deleteMedicineManagerSuccess = (payload) => ({
  type: DELETE__MEDICINE__MANAGER__SC,
  payload,
});

export const deleteMedicineManagerFail = (error) => ({
  type: DELETE__MEDICINE__MANAGER__FL,
  payload: error,
});

const initialState = {
  deletedMedicine: null,
  loading: false,
  error: null,
};

const deleteMedicineManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE__MEDICINE__MANAGER:
      return { ...state, loading: true, error: null };
    case DELETE__MEDICINE__MANAGER__SC:
      return { ...state, loading: false, deletedMedicine: action.payload };
    case DELETE__MEDICINE__MANAGER__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default deleteMedicineManagerReducer;
