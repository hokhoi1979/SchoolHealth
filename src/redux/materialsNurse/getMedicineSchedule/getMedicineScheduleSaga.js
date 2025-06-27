import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH__MEDICINE__SCHEDULE,
  fetchMedicineScheduleFail,
  fetchMedicineScheduleSuccess,
} from "./getMedicineScheduleSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* getMedicineScheduleSaga() {
  try {
    const token = yield select((state) => state.account.token);

    const response = yield call(
      axios.get,
      `${URL_API}/nurse/v1/medicineRequest/schedule`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchMedicineScheduleSuccess(response.data));
    } else {
      yield put(fetchMedicineScheduleFail(response.status));
    }
  } catch (error) {
    yield put(fetchMedicineScheduleFail(error));
  }
}

function* watchFetchMedicineSchedule() {
  yield takeLatest(FETCH__MEDICINE__SCHEDULE, getMedicineScheduleSaga);
}

export default watchFetchMedicineSchedule;
