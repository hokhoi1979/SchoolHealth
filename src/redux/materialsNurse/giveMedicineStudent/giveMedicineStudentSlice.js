export const GIVE__MEDICINE__STUDENT = "GIVE__MEDICINE__STUDENT";
export const GIVE__MEDICINE__STUDENT__SUCCESS =
  "GIVE__MEDICINE__STUDENT__SUCCESS";
export const GIVE__MEDICINE__STUDENT__FAIL = "GIVE__MEDICINE__STUDENT__FAIL";

export const giveMedicineStudent = (data) => ({
  type: GIVE__MEDICINE__STUDENT,
  payload: data,
});

export const giveMedicineStudentSuccess = (data) => ({
  type: GIVE__MEDICINE__STUDENT__SUCCESS,
  payload: data,
});

export const giveMedicineStudentFail = (error) => ({
  type: GIVE__MEDICINE__STUDENT__FAIL,
  payload: error,
});

const initialState = {
  giveMedicineToStudent: [],
  loading: false,
  error: null,
};

const giveMedicineStudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GIVE__MEDICINE__STUDENT:
      return { ...state, loading: true, error: null };
    case GIVE__MEDICINE__STUDENT__SUCCESS:
      return {
        ...state,
        loading: false,
        giveMedicineToStudent: action.payload,
      };
    case GIVE__MEDICINE__STUDENT:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default giveMedicineStudentReducer;
