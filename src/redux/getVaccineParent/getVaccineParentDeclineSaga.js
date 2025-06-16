import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_DECLINE_VACCINE,
  fetchDeclineVaccineSuccess,
  fetchDeclineVaccineFail,
} from "./getVaccineParentDeclineSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function* getVaccineParentDeclineSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const { id, studentID, reason } = action.payload;

    console.log("Decline Saga - Payload:", action.payload);
    console.log(
      "Decline Saga - URL:",
      `${URL_API}/parent/v1/${id}/${studentID}/declined`
    );

    const response = yield call(
      axios.put,
      `${URL_API}/parent/v1/${id}/${studentID}/declined`,
      { note: reason },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Decline Saga - Response:", response);

    if (response.status === 200 || response.status === 201) {
      yield put(fetchDeclineVaccineSuccess(response.data));
    } else {
      yield put(fetchDeclineVaccineFail(response.status));
    }
  } catch (error) {
    console.error("Decline Saga - Error:", error);
    yield put(
      fetchDeclineVaccineFail({
        message: error.message,
        code: error.code,
        status: error.response?.status,
        data: error.response?.data,
      })
    );
  }
}

function* watchFetchDeclineVaccine() {
  yield takeLatest(FETCH_DECLINE_VACCINE, getVaccineParentDeclineSaga);
}
export default watchFetchDeclineVaccine;
