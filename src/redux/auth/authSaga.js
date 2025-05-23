import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchFail, fetchSuccess, FETCH_API_LOGIN } from "./authSlice";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;
export function* fetchLogin(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_URL}/auth/login`,
      action.payload
    );
    if (response?.data?.accessToken) {
      const decodedUser = jwtDecode(response.data.accessToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      if (response.status === 200 || response.status === 201) {
        yield put(
          fetchSuccess({ user: decodedUser, token: response.data.accessToken })
        );
      } else {
        yield put(fetchFail(response.status));
      }
      if (action.onSuccess) action.onSuccess(response);
    } else {
      throw new Error("Email or password is not correct! Try again");
    }
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      let errorMessage = `Error ${status}: ${
        data.message || "Something went wrong"
      }`;
      if (data.message === "User is banned") {
        errorMessage = "banned";
      } else if (status === 401) {
        errorMessage = "Unauthorized! Please login again.";
        localStorage.removeItem("accessToken");
      } else if (status === 403) {
        errorMessage = "Forbidden! You don't have access.";
      } else if (status === 404) {
        errorMessage = "Not Found! Data is not exist!";
      } else if (status >= 500) {
        errorMessage = "Server Error! Please try again.";
      }
      yield put(fetchFail(errorMessage));
    } else if (error.request) {
      console.log(" No response from server:", error.request);
      yield put(fetchFail("Can not access network. Please check network!"));
    } else {
      console.log("API Request Error:", error.message);
      yield put(fetchFail(`Lỗi API: ${error.message}`));
    }
  }
}
function* watchFetchLogin() {
  yield takeLatest(FETCH_API_LOGIN, fetchLogin);
}

export default watchFetchLogin;
