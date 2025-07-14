export const FETCH_ALL__MEDICINE = "FETCH_ALL__MEDICINE";
export const FETCH_ALL__MEDICINE__SUCCESS = "FETCH_ALL__MEDICINE__SUCCESS";
export const FETCH_ALL__MEDICINE__FAIL = "FETCH_ALL__MEDICINE__FAIL";

export const fetchAllMedicine = (data) => ({
  type: FETCH_ALL__MEDICINE,
  payload: data,
});

export const fetchAllMedicineSuccess = (data) => ({
  type: FETCH_ALL__MEDICINE__SUCCESS,
  payload: data,
});

export const fetchAllMedicineFail = (error) => ({
  type: FETCH_ALL__MEDICINE__FAIL,
  payload: error,
});

const initialState = {
  medicine: [],
  loading: false,
  error: null,
};

const getAllMedicineNurseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL__MEDICINE:
      return { ...state, loading: true, error: null };
    case FETCH_ALL__MEDICINE__SUCCESS:
      return { ...state, loading: false, medicine: action.payload };
    case FETCH_ALL__MEDICINE__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getAllMedicineNurseReducer;
