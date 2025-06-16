export const FETCH__PARENT__HEALTH = "FETCH__PARENT__HEALTH";
export const FETCH__PARENT__HEALTH__SC = "FETCH__PARENT__HEALTH__SC";
export const FETCH__PARENT__HEALTH__FL = "FETCH__PARENT__HEALTH__FL";

export const fetchParentHealth = () => ({
  type: FETCH__PARENT__HEALTH,
});

export const fetchParentHealthSuccess = (data) => ({
  type: FETCH__PARENT__HEALTH__SC,
  payload: data,
});

export const fetchParentHealthFail = (error) => ({
  type: FETCH__PARENT__HEALTH__FL,
  payload: error,
});

const initialState = {
  healthProfileParent: [],
  loading: false,
  error: null,
};

const parentHealthProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__PARENT__HEALTH:
      return { ...state, loading: true, error: null };
    case FETCH__PARENT__HEALTH__SC:
      return { ...state, loading: false, healthProfileParent: action.payload };
    case FETCH__PARENT__HEALTH__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default parentHealthProfileReducer;
