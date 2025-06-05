import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchFail, fetchSuccess, FETCH_API_LOGIN } from "./authSlice";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;
export function* fetchLogin(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_URL}/v1/auth/login`,
      action.payload
    );
    if (response?.data?.backendToken?.accessToken) {
      const decodedUser = jwtDecode(response.data.backendToken.accessToken);
      localStorage.setItem("accessToken", response.data.backendToken.accessToken);
      if (response.status === 200 || response.status === 201) {
        yield put(
          fetchSuccess({ user: decodedUser, token: response.data.backendToken.accessToken })
        );
      } else {
        yield put(fetchFail(response.status));
      }
      if (action.onSuccess) action.onSuccess(response);
    } else {
      throw new Error("Email or password is not correct! Try again");
    }
  } catch (error) {
    console.error("Login error:", error.response || error.message);

  let errorMessage = "Login failed!";
  if (error.response?.data?.message) {
    errorMessage = error.response.data.message;
  } else if (error.message) {
    errorMessage = error.message;
  }
  yield put(fetchFail(errorMessage));
}

}
function* watchFetchLogin() {
  yield takeLatest(FETCH_API_LOGIN, fetchLogin);
}

export default watchFetchLogin;
