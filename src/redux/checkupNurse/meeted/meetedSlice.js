export const FETCH__MEETED = "FETCH__MEETED";
export const FETCH__MEETED__SUCCESS = "FETCH__MEETED__SUCCESS";
export const FETCH__MEETED__FAIL = "FETCH__MEETED__FAIL";

export const fetchMeeted = (data) => ({
  type: FETCH__MEETED,
  payload: data,
});

export const fetchMeetedSuccess = (data) => ({
  type: FETCH__MEETED__SUCCESS,
  payload: data,
});

export const fetchMeetedFail = (error) => ({
  type: FETCH__MEETED__FAIL,
  payload: error,
});

const initialState = {
  meetedParent: [],
  loading: false,
  error: null,
};

const meetedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__MEETED:
      return { ...state, loading: true, error: null };
    case FETCH__MEETED__SUCCESS:
      return { ...state, loading: false, meetedParent: action.payload };
    case FETCH__MEETED__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default meetedReducer;
