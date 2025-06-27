export const POST__REGISTER = "POST__REGISTER";
export const POST__REGISTER__SUCCESS = "POST__REGISTER__SUCCESS";
export const POST__REGISTER__FAIL = "POST__REGISTER__FAIL";

export const postRegister = (data) => ({
  type: POST__REGISTER,
  payload: data,
});

export const postRegisterSuccess = (data) => ({
  type: POST__REGISTER__SUCCESS,
  payload: data,
});

export const postRegisterFail = (error) => ({
  type: POST__REGISTER__FAIL,
  payload: error,
});

const initialState = {
  accountRegister: null,
  token: null,
  loading: false,
  error: null,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST__REGISTER:
      return { ...state, loading: true, error: null };
    case POST__REGISTER__SUCCESS:
      return {
        ...state,
        loading: false,
        accountRegister: action.payload.user,
        token: action.payload.token,
      };
    case POST__REGISTER__FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default registerReducer;
