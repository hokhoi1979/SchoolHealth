export const STOP__PROVIDE__MEDICINE = "STOP__PROVIDE__MEDICINE";
export const STOP__PROVIDE__MEDICINE__SUCCESS =
  "STOP__PROVIDE__MEDICINE__SUCCESS";
export const STOP__PROVIDE__MEDICINE__FAIL = "STOP__PROVIDE__MEDICINE__FAIL";

export const stopProvideMedicince = (data) => ({
  type: STOP__PROVIDE__MEDICINE,
  payload: data,
});

export const stopProvideMedicinceSuccess = (data) => ({
  type: STOP__PROVIDE__MEDICINE__SUCCESS,
  payload: data,
});

export const stopProvideMedicinceFail = (error) => ({
  type: STOP__PROVIDE__MEDICINE__FAIL,
  payload: error,
});

const initialState = {
  stopProvide: [],
  loading: false,
  error: null,
};

const stopProvideMedicineReducer = (state = initialState, action) => {
  switch (action.type) {
    case STOP__PROVIDE__MEDICINE:
      return { ...state, loading: true, error: null };
    case STOP__PROVIDE__MEDICINE__SUCCESS:
      return { ...state, loaing: false, stopProvide: action.payload };
    case STOP__PROVIDE__MEDICINE__FAIL:
      return { ...state, loaing: false, error: action.payload };
    default:
      return state;
  }
};

export default stopProvideMedicineReducer;
