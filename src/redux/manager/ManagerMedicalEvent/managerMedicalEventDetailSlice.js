// Types
export const FETCH__MANAGER__MEDICAL__EVENT__DETAIL =
  "FETCH__MANAGER__MEDICAL__EVENT__DETAIL";
export const FETCH__MANAGER__MEDICAL__EVENT__DETAIL__SC =
  "FETCH__MANAGER__MEDICAL__EVENT__DETAIL__SC";
export const FETCH__MANAGER__MEDICAL__EVENT__DETAIL__FL =
  "FETCH__MANAGER__MEDICAL__EVENT__DETAIL__FL";

// Actions
export const fetchManagerMedicalEventDetail = (id) => ({
  type: FETCH__MANAGER__MEDICAL__EVENT__DETAIL,
  payload: id,
});

export const fetchManagerMedicalEventDetailSuccess = (data) => ({
  type: FETCH__MANAGER__MEDICAL__EVENT__DETAIL__SC,
  payload: data,
});

export const fetchManagerMedicalEventDetailFail = (error) => ({
  type: FETCH__MANAGER__MEDICAL__EVENT__DETAIL__FL,
  payload: error,
});

// Initial State
const initialState = {
  detail: null,
  loading: false,
  error: null,
};

// Reducer
const getManagerMedicalEventDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__MANAGER__MEDICAL__EVENT__DETAIL:
      return { ...state, loading: true, error: null };
    case FETCH__MANAGER__MEDICAL__EVENT__DETAIL__SC:
      return { ...state, loading: false, detail: action.payload };
    case FETCH__MANAGER__MEDICAL__EVENT__DETAIL__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getManagerMedicalEventDetailReducer;
