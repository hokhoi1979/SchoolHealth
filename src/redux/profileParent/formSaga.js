import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH__FORM, fetchFormFail, fetchFormSuccess } from "./formSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function* formSaga() {
  try {
    const token = localStorage.getItem("accessToken");
    const response = yield call(
      axios.get,
      `${URL_API}/parent/v1/health/formData`,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchFormSuccess(response.data.data)); // hoặc .result nếu API trả theo cách đó
    } else {
      yield put(fetchFormFail(`Status: ${response.status}`));
    }
  } catch (error) {
    yield put(fetchFormFail(error.message || "Unknown error"));
  }
}

function* watchFetchForm() {
  yield takeLatest(FETCH__FORM, formSaga);
}

export default watchFetchForm;
