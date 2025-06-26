export const POST__MANAGER__SUPPLY = "POST__MANAGER__SUPPLY";
export const POST__MANAGER__SUPPLY__SC = "POST__MANAGER__SUPPLY__SC";
export const POST__MANAGER__SUPPLY__FL = "POST__MANAGER__SUPPLY__FL";

export const postManagerSupply = (data) => ({
  type: POST__MANAGER__SUPPLY,
  payload: data,
});

export const postManagerSucessSupply = (data) => ({
  type: POST__MANAGER__SUPPLY__SC,
  payload: data,
});

export const postManagerFailSupply = (error) => ({
  type: POST__MANAGER__SUPPLY__FL,
  payload: error,
});

const initialState = {
  supplyCreate: [],
  loading: false,
  error: null,
};

const managerCreateSupplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST__MANAGER__SUPPLY:
      return { ...state, loading: true, error: null };
    case POST__MANAGER__SUPPLY__SC:
      return { ...state, loading: false, supplyCreate: action.payload };
    case POST__MANAGER__SUPPLY__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default managerCreateSupplyReducer;
