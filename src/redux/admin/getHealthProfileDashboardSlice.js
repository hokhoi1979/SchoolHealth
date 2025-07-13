export const HEALTH_PROFILE_DASHBOARD = "HEALTH_PROFILE_DASHBOARD";
export const HEALTH_PROFILE_DASHBOARD_SUCCESS =
  "HEALTH_PROFILE_DASHBOARD_SUCCESS";
export const HEALTH_PROFILE_DASHBOARD_FAIL = "HEALTH_PROFILE_DASHBOARD_FAIL";

export const healthProfileDashboard = (data) => ({
  type: HEALTH_PROFILE_DASHBOARD,
  payload: data,
});

export const healthProfileDashboardSuccess = (data) => ({
  type: HEALTH_PROFILE_DASHBOARD_SUCCESS,
  payload: data,
});

export const healthProfileDashboardFail = (error) => ({
  type: HEALTH_PROFILE_DASHBOARD_FAIL,
  payload: error,
});

const initialState = {
  data: {},
  loading: false,
  error: null,
};

const healthProfileDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case HEALTH_PROFILE_DASHBOARD:
      return { ...state, loading: true, error: null };
    case HEALTH_PROFILE_DASHBOARD_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case HEALTH_PROFILE_DASHBOARD_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default healthProfileDashboardReducer;
