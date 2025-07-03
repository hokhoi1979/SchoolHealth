import { call, put, select, takeLatest } from "redux-saga/effects";

import axios from "axios";
import {
  FETCH_DETAIL_VACCINE,
  fetchDetailVaccineFail,
  fetchDetailVaccineSuccess,
} from "./getDetailVaccineManagerSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* getDetailVaccineSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const id = action.payload;

    const response = yield call(
      axios.get,
      `${URL_API}/manager/v1/vaccinationEvent/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchDetailVaccineSuccess(response.data.data));
    } else {
      yield put(fetchDetailVaccineFail(response.status));
    }
  } catch (error) {
    yield put(fetchDetailVaccineFail(error));
  }
}

function* watchFetchDetailVaccineManager() {
  yield takeLatest(FETCH_DETAIL_VACCINE, getDetailVaccineSaga);
}
export default watchFetchDetailVaccineManager;
