import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH__CREATE__HEALTH,
  fetchCreateHealthFail,
  fetchCreateHealthSucess,
} from "./createHealthSlice";
import axios from "axios";
import { fetchVaccineStudentFail } from "../vaccine/vaccineByIdSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* createHealthSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const id = action.payload;
    const response = yield call(axios.post, `${URL_API}/parent/v1/health`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      console.log(response.data);

      yield put(fetchCreateHealthSucess(response.data));
    } else {
      yield put(fetchCreateHealthFail(response.status));
    }
  } catch (error) {
    yield put(fetchCreateHealthFail(error));
  }
}

function* watchFetchCreateHealth() {
  yield takeLatest(FETCH__CREATE__HEALTH, createHealthSaga);
}

export default watchFetchCreateHealth;
