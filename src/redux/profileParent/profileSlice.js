// actions
export const FETCH_HEALTH_PROFILE = "FETCH_HEALTH_PROFILE";
export const FETCH_HEALTH_PROFILE_SUCCESS = "FETCH_HEALTH_PROFILE_SUCCESS";
export const FETCH_HEALTH_PROFILE_FAIL = "FETCH_HEALTH_PROFILE_FAIL";

// action creators
export const fetchHealthProfile = () => ({ type: FETCH_HEALTH_PROFILE });
export const fetchHealthProfileSuccess = (data) => ({
  type: FETCH_HEALTH_PROFILE_SUCCESS,
  payload: data,
});
export const fetchHealthProfileFail = (error) => ({
  type: FETCH_HEALTH_PROFILE_FAIL,
  payload: error,
});

// reducer
const initialState = {
  healthProfiles: [], // List of students with health info
  loading: false,
  error: null,
};

const healthProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HEALTH_PROFILE:
      return { ...state, loading: true, error: null };
    case FETCH_HEALTH_PROFILE_SUCCESS:
      return { ...state, loading: false, healthProfiles: action.payload };
    case FETCH_HEALTH_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default healthProfileReducer;
