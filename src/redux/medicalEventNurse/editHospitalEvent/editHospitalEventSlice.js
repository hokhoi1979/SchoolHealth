export const PATCH__HOSPITAL__EVENT = "PATCH__HOSPITAL__EVENT";
export const PATCH__HOSPITAL__EVENT__SUCCESS =
  "PATCH__HOSPITAL__EVENT__SUCCESS";
export const PATCH__HOSPITAL__EVENT__FAIL = "PATCH__HOSPITAL__EVENT__FAIL";

export const patchHospitalEvent = (data) => ({
  type: PATCH__HOSPITAL__EVENT,
  payload: data,
});

export const patchHospitalEventSuccess = (data) => ({
  type: PATCH__HOSPITAL__EVENT__SUCCESS,
  payload: data,
});

export const patchHospitalEventFail = (error) => ({
  type: PATCH__HOSPITAL__EVENT__FAIL,
  payload: error,
});

const initialState = {
  hospitalEvent: [],
  loading: false,
  error: null,
};

const hospitalEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case PATCH__HOSPITAL__EVENT:
      return { ...state, loading: true, error: null };
    case PATCH__HOSPITAL__EVENT__SUCCESS:
      return { ...state, loading: false, hospitalEvent: action.payload };
    case PATCH__HOSPITAL__EVENT__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default hospitalEventReducer;
