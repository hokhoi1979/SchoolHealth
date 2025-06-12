import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_VACCINE_PARENT_RESULT,
  fetchVaccineParentResultFail,
  fetchVaccineParentResultSuccess,
} from "./getVaccineParentResultSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* vaccineParentResultSaga() {
  try {
    const token = localStorage.getItem("accessToken");
    const response = yield call(
      axios.get,
      `${URL_API}/parent/v1/vaccinationEvent/result`,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("KHANH", response.data);
      yield put(fetchVaccineParentResultSuccess(response.data));
    } else {
      yield put(fetchVaccineParentResultFail(`API Error: ${response.data}`));
    }
  } catch (error) {
    yield put(fetchVaccineParentResultFail(`API Error: ${error}`));
  }
}

function* watchFetchVaccineParentResult() {
  yield takeLatest(FETCH_VACCINE_PARENT_RESULT, vaccineParentResultSaga);
}
export default watchFetchVaccineParentResult;
