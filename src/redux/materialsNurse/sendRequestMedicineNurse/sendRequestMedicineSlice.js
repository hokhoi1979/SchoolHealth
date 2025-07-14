export const POST__REQUEST__MEDICINE = "POST__REQUEST__MEDICINE";
export const POST__REQUEST__MEDICINE__SUCCESS =
  "POST__REQUEST__MEDICINE__SUCCESS";
export const POST__REQUEST__MEDICINE__FAIL = "POST__REQUEST__MEDICINE__FAIL";

export const postRequestMedicine = (data) => ({
  type: POST__REQUEST__MEDICINE,
  payload: data,
});

export const postRequestMedicineSuccess = (data) => ({
  type: POST__REQUEST__MEDICINE__SUCCESS,
  payload: data,
});

export const postRequestMedicineFail = (error) => ({
  type: POST__REQUEST__MEDICINE__FAIL,
  payload: error,
});

const initialState = {
  sendRequestMedicine: [],
  loading: false,
  error: null,
};

const postRequestMedicineReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST__REQUEST__MEDICINE:
      return { ...state, loading: true, error: null };
    case POST__REQUEST__MEDICINE__SUCCESS:
      return { ...state, loading: false, sendRequestMedicine: action.payload };
    case POST__REQUEST__MEDICINE__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default postRequestMedicineReducer;
