import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  FETCH__MEDICINE__CLASSTIFY__MANAGER,
  FETCH__MEDICINE__CLASSTIFY__MANAGER__FL,
  fetchMedicineClasstifyManagerFail,
  fetchMedicineClasstifyManagerSucess,
} from "./getManagerMedicineClassifySlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* medicineClasstifyManagerSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { page, limit = 100 } = action.payload || {};

    const response = yield call(
      axios.get,
      `${URL_API}/manager/v1/medicine-classify?page=${page}&limit=${limit}&sortBy=createdAt&order=asc`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchMedicineClasstifyManagerSucess(response.data));
    } else {
      yield put(fetchMedicineClasstifyManagerFail(response.status));
    }
  } catch (error) {
    yield put(fetchMedicineClasstifyManagerFail(error));
  }
}

function* watchFetchMedicineClasstifyManager() {
  yield takeLatest(
    FETCH__MEDICINE__CLASSTIFY__MANAGER,
    medicineClasstifyManagerSaga
  );
}

export default watchFetchMedicineClasstifyManager;
