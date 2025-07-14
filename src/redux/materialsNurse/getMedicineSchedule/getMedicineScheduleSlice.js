export const FETCH__MEDICINE__SCHEDULE = "FETCH__MEDICINE__SCHEDULE";
export const FETCH__MEDICINE__SCHEDULE__SUCCESS =
  "FETCH__MEDICINE__SCHEDULE__SUCCESS";
export const FETCH__MEDICINE__SCHEDULE__FAIL =
  "FETCH__MEDICINE__SCHEDULE__FAIL";

export const fetchMedicineSchedule = (data) => ({
  type: FETCH__MEDICINE__SCHEDULE,
  payload: data,
});

export const fetchMedicineScheduleSuccess = (data) => ({
  type: FETCH__MEDICINE__SCHEDULE__SUCCESS,
  payload: data,
});

export const fetchMedicineScheduleFail = (error) => ({
  type: FETCH__MEDICINE__SCHEDULE__FAIL,
  payload: error,
});

const initialState = {
  medicineSchedule: [],
  loading: false,
  error: null,
};

const fetchMedicineScheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__MEDICINE__SCHEDULE:
      return { ...state, loading: true, error: null };
    case FETCH__MEDICINE__SCHEDULE__SUCCESS:
      return {
        ...state,
        loading: false,
        medicineSchedule: action.payload,
      };
    case FETCH__MEDICINE__SCHEDULE__FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default fetchMedicineScheduleReducer;
