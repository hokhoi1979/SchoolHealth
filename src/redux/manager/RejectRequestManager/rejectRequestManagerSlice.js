export const UPDATE_MANAGER_SUPPLY = "UPDATE_MANAGER_SUPPLY";
export const UPDATE_MANAGER_SUPPLY_SUCCESS = "UPDATE_MANAGER_SUPPLY_SUCCESS";
export const UPDATE_MANAGER_SUPPLY_FAIL = "UPDATE_MANAGER_SUPPLY_FAIL";

export const updateManagerSupply = (data) => ({
  type: UPDATE_MANAGER_SUPPLY,
  payload: data,
});

export const updateManagerSupplySuccess = (data) => ({
  type: UPDATE_MANAGER_SUPPLY_SUCCESS,
  payload: data,
});

export const updateManagerSupplyFail = (error) => ({
  type: UPDATE_MANAGER_SUPPLY_FAIL,
  payload: error,
});

// 👉 REDUCER
const initialState = {
  supplyUpdate: [],
  loading: false,
  error: null,
};

const updateManagerSupplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MANAGER_SUPPLY:
      return { ...state, loading: true, error: null };
    case UPDATE_MANAGER_SUPPLY_SUCCESS:
      return { ...state, loading: false, supplyUpdate: action.payload };
    case UPDATE_MANAGER_SUPPLY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default updateManagerSupplyReducer;
