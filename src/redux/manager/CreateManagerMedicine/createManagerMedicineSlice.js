export const POST__MANAGER__MEDICINE = "POST__MANAGER__MEDICINE";
export const POST__MANAGER__MEDICINE__SC = "POST__MANAGER__MEDICINE__SC";
export const POST__MANAGER__MEDICINE__FL = "POST__MANAGER_MEDICINE__FL";

export const postManagerMedicine = (data) => ({
  type: POST__MANAGER__MEDICINE,
  payload: data,
});

export const postManagerSucessMedicine = (data) => ({
  type: POST__MANAGER__MEDICINE__SC,
  payload: data,
});

export const postMangerFailMedicine = (error) => ({
  type: POST__MANAGER__MEDICINE__FL,
  payload: error,
});
const initialState = {
  medicineCreate: [],
  loading: false,
  error: null,
};

const managerCreateMedicineReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST__MANAGER__MEDICINE:
      return { ...state, loading: true, error: null };
    case POST__MANAGER__MEDICINE__SC:
      return { ...state, loading: false, vaccine: action.payload };
    case POST__MANAGER__MEDICINE__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default managerCreateMedicineReducer;
