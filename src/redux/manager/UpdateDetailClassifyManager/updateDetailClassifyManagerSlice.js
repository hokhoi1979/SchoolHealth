export const PUT__MANAGER__CLASSIFY = "PUT__MANAGER__CLASSIFY";
export const PUT__MANAGER__CLASSIFY__SC = "PUT__MANAGER__CLASSIFY__SC";
export const PUT__MANAGER__CLASSIFY__FL = "PUT__MANAGER__CLASSIFY__FL";

export const putManagerClassify = (data) => ({
  type: PUT__MANAGER__CLASSIFY,
  payload: data,
});

export const putManagerClassifySuccess = (data) => ({
  type: PUT__MANAGER__CLASSIFY__SC,
  payload: data,
});

export const putManagerClassifyFail = (errorMessage) => ({
  type: PUT__MANAGER__CLASSIFY__FL,
  payload: errorMessage,
});

const initialState = {
  classifyUpdate: [],
  loading: false,
  error: null,
};

const UpdateDetailClassifyManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT__MANAGER__CLASSIFY:
      return { ...state, loading: true, error: null };
    case PUT__MANAGER__CLASSIFY__SC:
      return { ...state, loading: false, classifyUpdate: action.payload };
    case PUT__MANAGER__CLASSIFY__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default UpdateDetailClassifyManagerReducer;
