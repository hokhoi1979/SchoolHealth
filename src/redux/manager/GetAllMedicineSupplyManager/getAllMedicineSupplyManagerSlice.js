// Constants
export const FETCH__ALL__MEDICINE__SUPPLY__MANAGER =
  "FETCH__ALL__MEDICINE__SUPPLY__MANAGER";
export const FETCH__ALL__MEDICINE__SUPPLY__MANAGER__SC =
  "FETCH__ALL__MEDICINE__SUPPLY__MANAGER__SC";
export const FETCH__ALL__MEDICINE__SUPPLY__MANAGER__FL =
  "FETCH__ALL__MEDICINE__SUPPLY__MANAGER__FL";

// Actions
export const fetchAllMedicineSupplyManager = (data) => ({
  type: FETCH__ALL__MEDICINE__SUPPLY__MANAGER,
  payload: data,
});

export const fetchAllMedicineSupplyManagerSuccess = (data) => ({
  type: FETCH__ALL__MEDICINE__SUPPLY__MANAGER__SC,
  payload: data,
});

export const fetchAllMedicineSupplyManagerFail = (error) => ({
  type: FETCH__ALL__MEDICINE__SUPPLY__MANAGER__FL,
  payload: error,
});

// Initial State
const initialState = {
  medicineSupplyManager: [],
  loading: false,
  error: null,
};

// Reducer
const getAllMedicineSupplyManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__ALL__MEDICINE__SUPPLY__MANAGER:
      return { ...state, loading: true, error: null };
    case FETCH__ALL__MEDICINE__SUPPLY__MANAGER__SC:
      return {
        ...state,
        loading: false,
        medicineSupplyManager: action.payload,
      };
    case FETCH__ALL__MEDICINE__SUPPLY__MANAGER__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getAllMedicineSupplyManagerReducer;
