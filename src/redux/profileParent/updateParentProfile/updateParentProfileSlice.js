export const FETCH_UPDARE_PARENT = "FETCH_UPDARE_PARENT";
export const FETCH_UPDARE_PARENT_SUCCESS = "FETCH_UPDARE_PARENT_SUCCESS";
export const FETCH_UPDARE_PARENT_FAIL = "FETCH_UPDARE_PARENT_FAIL";

export const fetchUpdateParent = (data) => ({
  type: FETCH_UPDARE_PARENT,
  payload: data,
});

export const fetchUpdateParentSuccess = (data) => ({
  type: FETCH_UPDARE_PARENT_SUCCESS,
  payload: data,
});

export const fetchUpdateParentFail = (error) => ({
  type: FETCH_UPDARE_PARENT_FAIL,
  payload: error,
});

const initialState = {
  parent: [],
  loading: false,
  error: null,
};

const updateParentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UPDARE_PARENT:
      return { ...state, loading: true, error: null };
    case FETCH_UPDARE_PARENT_SUCCESS:
      return { ...state, loading: false, parent: action.payload };
    case FETCH_UPDARE_PARENT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default updateParentReducer;
