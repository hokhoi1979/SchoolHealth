export const FETCH__MEDICINE__DETAIL__REQUEST =
  "FETCH__MEDICINE__DETAIL__REQUEST";
export const FETCH__MEDICINE__DETAIL__REQUEST__SUCCESS =
  "FETCH__MEDICINE__DETAIL__REQUEST__SUCCESS";
export const FETCH__MEDICINE__DETAIL__REQUEST__FAIL =
  "FETCH__MEDICINE__DETAIL__REQUEST__FAIL";

export const fetchMedicineDetailRequest = (data) => ({
  type: FETCH__MEDICINE__DETAIL__REQUEST,
  payload: data,
});

export const fetchMedicineDetailRequestSuccess = (data) => ({
  type: FETCH__MEDICINE__DETAIL__REQUEST__SUCCESS,
  payload: data,
});

export const fetchMedicineDetailRequestFail = (error) => ({
  type: FETCH__MEDICINE__DETAIL__REQUEST__FAIL,
  payload: error,
});

const initialState = {
  getMedicineDetailRequest: [],
  loading: false,
  error: null,
};

const medicineDeTailRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__MEDICINE__DETAIL__REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH__MEDICINE__DETAIL__REQUEST__SUCCESS:
      return {
        ...state,
        loading: false,
        getMedicineDetailRequest: action.payload,
      };
    case FETCH__MEDICINE__DETAIL__REQUEST__FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default medicineDeTailRequestReducer;
