import { act } from "react";

export const FETCH__MEDICINE__SUPPLY = "FETCH__MEDICINE__SUPPLY";
export const FETCH__MEDICINE__SUPPLY__SUCCESS =
  "FETCH__MEDICINE__SUPPLY__SUCCESS";
export const FETCH__MEDICINE__SUPPLY__FAIL = "FETCH__MEDICINE__SUPPLY__FAIL";

export const fetchMedicineSupply = (data) => ({
  type: FETCH__MEDICINE__SUPPLY,
  payload: data,
});

export const fetchMedicineSupplySuccess = (data) => ({
  type: FETCH__MEDICINE__SUPPLY__SUCCESS,
  payload: data,
});

export const fetchMedicineSupplyFail = (error) => ({
  type: FETCH__MEDICINE__SUPPLY__FAIL,
  payload: error,
});

const initialState = {
  medicineSupply: [],
  loading: false,
  error: null,
};

const getMedicineSupplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__MEDICINE__SUPPLY:
      return { ...state, loading: true, error: null };
    case FETCH__MEDICINE__SUPPLY__SUCCESS:
      return { ...state, loading: false, medicineSupply: action.payload };
    case FETCH__MEDICINE__SUPPLY__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getMedicineSupplyReducer;
