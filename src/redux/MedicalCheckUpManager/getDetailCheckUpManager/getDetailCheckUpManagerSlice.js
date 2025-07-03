export const FETCH__DETAIL__CHECKUP__MANAGER =
  "FETCH__DETAIL__CHECKUP__MANAGER";
export const FETCH__DETAIL__CHECKUP__MANAGER__SC =
  "FETCH__DETAIL__CHECKUP__MANAGER__SC";
export const FETCH__DETAIL__CHECKUP__MANAGER__FL =
  "FETCH__DETAIL__CHECKUP__MANAGER__FL";

export const fetchDetailCheckupManager = (id) => ({
  type: FETCH__DETAIL__CHECKUP__MANAGER,
  payload: id,
});

export const fetchDetailCheckupManagerSuccess = (data) => ({
  type: FETCH__DETAIL__CHECKUP__MANAGER__SC,
  payload: data,
});

export const fetchDetailCheckupManagerFail = (error) => ({
  type: FETCH__DETAIL__CHECKUP__MANAGER__FL,
  payload: error,
});

const initialState = {
  checkupDetail: null,
  loading: false,
  error: null,
};

const getDetailCheckupManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__DETAIL__CHECKUP__MANAGER:
      return { ...state, loading: true, error: null };
    case FETCH__DETAIL__CHECKUP__MANAGER__SC:
      return {
        ...state,
        loading: false,
        checkupDetail: action.payload,
      };
    case FETCH__DETAIL__CHECKUP__MANAGER__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getDetailCheckupManagerReducer;
