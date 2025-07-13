export const MEDICAL_EVENT_DASHBOARD = "MEDICAL_EVENT_DASHBOARD";
export const MEDICAL_EVENT_DASHBOARD_SUCCESS =
  "MEDICAL_EVENT_DASHBOARD_SUCCESS";
export const MEDICAL_EVENT_DASHBOARD_FAIL = "MEDICAL_EVENT_DASHBOARD_FAIL";

export const medicalEventDashboard = (data) => ({
  type: MEDICAL_EVENT_DASHBOARD,
  payload: data,
});

export const medicalEventDashboardSuccess = (data) => ({
  type: MEDICAL_EVENT_DASHBOARD_SUCCESS,
  payload: data,
});

export const medicalEventDashboardFail = (error) => ({
  type: MEDICAL_EVENT_DASHBOARD_FAIL,
  payload: data,
});

const initialState = {
  data: {},
  loading: false,
  error: null,
};

const medicalEventDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEDICAL_EVENT_DASHBOARD:
      return { ...state, loading: true, error: null };
    case MEDICAL_EVENT_DASHBOARD_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case MEDICAL_EVENT_DASHBOARD_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default medicalEventDashboardReducer;
