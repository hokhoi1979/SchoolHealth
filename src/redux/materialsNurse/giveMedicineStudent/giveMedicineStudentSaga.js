import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  GIVE__MEDICINE__STUDENT,
  giveMedicineStudentFail,
  giveMedicineStudentSuccess,
} from "./giveMedicineStudentSlice";
import { toast } from "react-toastify";
import {
  fetchMedicineScheduleFail,
  fetchMedicineScheduleSuccess,
} from "../getMedicineSchedule/getMedicineScheduleSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* giveMedicineStudentSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const { id, body } = action.payload;
    const response = yield call(
      axios.post,
      `${URL_API}/nurse/v1/medicineRequest/${id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(giveMedicineStudentSuccess(response.data));
      toast.success("Give medicine to student successful!");
      const fetch = yield call(
        axios.get,
        `${URL_API}/nurse/v1/medicineRequest/schedule`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (fetch.status === 200 || fetch.status === 201) {
        yield put(fetchMedicineScheduleSuccess(fetch.data));
      } else {
        yield put(fetchMedicineScheduleFail(fetch.status));
      }
    } else {
      yield put(giveMedicineStudentFail(response.status));
    }
  } catch (error) {
    yield put(giveMedicineStudentFail(error));
  }
}

function* watchGiveMedicineStudent() {
  yield takeLatest(GIVE__MEDICINE__STUDENT, giveMedicineStudentSaga);
}

export default watchGiveMedicineStudent;
