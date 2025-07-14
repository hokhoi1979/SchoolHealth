export const FETCH__MEDICAL__EVENT__DETAIL = "FETCH__MEDICAL__EVENT__DETAIL";
export const FETCH__MEDICAL__EVENT__DETAIL__SUCCESS =
  "FETCH__MEDICAL__EVENT__DETAIL__SUCCESS";
export const FETCH__MEDICAL__EVENT__DETAIL__FAIL =
  "FETCH__MEDICAL__EVENT__DETAIL__FAIL";

export const fetchMedicalEventDetail = (data) => ({
  type: FETCH__MEDICAL__EVENT__DETAIL,
  payload: data,
});

export const fetchMedicalEventDetailSuccess = (data) => ({
  type: FETCH__MEDICAL__EVENT__DETAIL__SUCCESS,
  payload: data,
});

export const fetchMedicalEventDetailFail = (error) => ({
  type: FETCH__MEDICAL__EVENT__DETAIL__FAIL,
  payload: error,
});

const initialState = {
  getMedicalEventDetail: [],
  loading: false,
  error: null,
};

const getMedicalEventDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__MEDICAL__EVENT__DETAIL:
      return { ...state, loading: true, error: false };
    case FETCH__MEDICAL__EVENT__DETAIL__SUCCESS:
      return {
        ...state,
        loading: false,
        getMedicalEventDetail: action.payload,
      };
    case FETCH__MEDICAL__EVENT__DETAIL__FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getMedicalEventDetailReducer;
