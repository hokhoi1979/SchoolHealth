import { act } from "react";

export const FETCH__MEDICAL__EVENT = "FETCH__MEDICAL__EVENT";
export const FETCH__MEDICAL__EVENT__SUCCESS = "FETCH__MEDICAL__EVENT__SUCCESS";
export const FETCH__MEDICAL__EVENT__FAIL = "FETCH__MEDICAL__EVENT__FAIL";

export const fetchMedicalEvent = (data) => ({
  type: FETCH__MEDICAL__EVENT,
  payload: data,
});

export const fetchMedicalEventSuccess = (data) => ({
  type: FETCH__MEDICAL__EVENT__SUCCESS,
  payload: data,
});

export const fetchMedicalEventFail = (error) => ({
  type: FETCH__MEDICAL__EVENT__FAIL,
  payload: error,
});

const initialState = {
  getMedicalEvent: [],
  loading: false,
  error: null,
};

const getMedicalEventNurseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__MEDICAL__EVENT:
      return { ...state, loading: true, error: null };
    case FETCH__MEDICAL__EVENT__SUCCESS:
      return { ...state, loading: false, getMedicalEvent: action.payload };
    case FETCH__MEDICAL__EVENT__FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getMedicalEventNurseReducer;
