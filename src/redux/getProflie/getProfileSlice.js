export const FETCH_GET_PROFILE = "FETCH_GET_PROFILE";
export const FETCH_GET_PROFILE_SUCCESS = "FETCH_GET_PROFILE_SUCCESS";
export const FETCH_GET_PROFILE_FAIL = "FETCH_GET_PROFILE_FAIL";

export const fetchGetProfile = (data) => ({
  type: FETCH_GET_PROFILE,
  payload: data,
});
export const fetchGetProfileSuccess = (data) => ({
  type: FETCH_GET_PROFILE_SUCCESS,
  payload: data,
});
export const fetchGetProfileFail = (error) => ({
  type: FETCH_GET_PROFILE_FAIL,
  payload: error,
});

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const getProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GET_PROFILE:
      return { ...state, loading: true, error: null };
    case FETCH_GET_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case FETCH_GET_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getProfileReducer;
