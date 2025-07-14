export const FETCH__VACCINE__MANAGER = "FETCH__VACCINE__MANAGER";
export const FETCH__VACCINE__MANAGER__SC = "FETCH__VACCINE__MANAGER__SC";
export const FETCH__VACCINE__MANAGER__FL = "FETCH__VACCINE__MANAGER__FL";

export const fetchVaccineManager = (data) => ({
  type: FETCH__VACCINE__MANAGER,
  payload: data,
});

export const fetchVaccineManagerSucess = (data) => ({
  type: FETCH__VACCINE__MANAGER__SC,
  payload: data,
});

export const fetchVaccineManagerFail = (error) => ({
  type: FETCH__VACCINE__MANAGER__FL,
  payload: error,
});

const initialState = {
  vaccineDay: [],
  loading: false,
  error: null,
};

const getVaccineManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH__VACCINE__MANAGER:
      return { ...state, loading: true, error: null };
    case FETCH__VACCINE__MANAGER__SC:
      return { ...state, loading: false, vaccineDay: action.payload };
    case FETCH__VACCINE__MANAGER__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getVaccineManagerReducer;
