// deleteManagerSupplySlice.js

// Action Types
export const DELETE__MANAGER__SUPPLY = "DELETE__MANAGER__SUPPLY";
export const DELETE__MANAGER__SUPPLY__SC = "DELETE__MANAGER__SUPPLY__SC";
export const DELETE__MANAGER__SUPPLY__FL = "DELETE__MANAGER__SUPPLY__FL";

// Actions
export const deleteManagerSupply = (data) => ({
  type: DELETE__MANAGER__SUPPLY,
  payload: data,
});

export const deleteManagerSupplySuccess = (data) => ({
  type: DELETE__MANAGER__SUPPLY__SC,
  payload: data,
});

export const deleteManagerSupplyFail = (error) => ({
  type: DELETE__MANAGER__SUPPLY__FL,
  payload: error,
});

// Initial State
const initialState = {
  deletedSupply: [],
  loading: false,
  error: null,
};

// Reducer
const deleteManagerSupplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE__MANAGER__SUPPLY:
      return { ...state, loading: true, error: null };
    case DELETE__MANAGER__SUPPLY__SC:
      return {
        ...state,
        loading: false,
        deletedSupply: action.payload,
      };
    case DELETE__MANAGER__SUPPLY__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default deleteManagerSupplyReducer;
