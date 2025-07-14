export const PUT__MANAGER__SUPPLY = "PUT__MANAGER__SUPPLY";
export const PUT__MANAGER__SUPPLY__SC = "PUT__MANAGER__SUPPLY__SC";
export const PUT__MANAGER__SUPPLY__FL = "PUT__MANAGER__SUPPLY__FL";

export const putManagerSupply = (data) => ({
  type: PUT__MANAGER__SUPPLY,
  payload: data,
});

export const putManagerSuccessSupply = (data) => ({
  type: PUT__MANAGER__SUPPLY__SC,
  payload: data,
});

export const putManagerFailSupply = (error) => ({
  type: PUT__MANAGER__SUPPLY__FL,
  payload: error,
});

const initialState = {
  supplyUpdate: [],
  loading: false,
  error: null,
};

const managerUpdateSupplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT__MANAGER__SUPPLY:
      return { ...state, loading: true, error: null };
    case PUT__MANAGER__SUPPLY__SC:
      return { ...state, loading: false, supplyUpdate: action.payload };
    case PUT__MANAGER__SUPPLY__FL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default managerUpdateSupplyReducer;
