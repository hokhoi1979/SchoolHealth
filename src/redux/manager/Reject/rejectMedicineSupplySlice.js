export const REJECT__MANAGER__MEDICINE__SUPPLY =
  "REJECT__MANAGER__MEDICINE__SUPPLY";
export const REJECT__MANAGER__MEDICINE__SUPPLY__SC =
  "REJECT__MANAGER__MEDICINE__SUPPLY__SC";
export const REJECT__MANAGER__MEDICINE__SUPPLY__FL =
  "REJECT__MANAGER__MEDICINE__SUPPLY__FL";

export const rejectManagerMedicineSupply = (data) => ({
  type: REJECT__MANAGER__MEDICINE__SUPPLY,
  payload: data,
});

export const rejectManagerMedicineSupplySuccess = (data) => ({
  type: REJECT__MANAGER__MEDICINE__SUPPLY__SC,
  payload: data,
});

export const rejectManagerMedicineSupplyFail = (error) => ({
  type: REJECT__MANAGER__MEDICINE__SUPPLY__FL,
  payload: error,
});

const initialState = {
  rejectResult: [],
  loading: false,
  error: null,
};

const rejectManagerMedicineSupplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case REJECT__MANAGER__MEDICINE__SUPPLY:
      return { ...state, loading: true, error: null };
    case REJECT__MANAGER__MEDICINE__SUPPLY__SC:
      return { ...state, loading: false, rejectResult: action.payload };
    case REJECT__MANAGER__MEDICINE__SUPPLY__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default rejectManagerMedicineSupplyReducer;
