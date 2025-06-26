import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH__MANAGER__MEDICAL__EVENT__DETAIL,
  fetchManagerMedicalEventDetailFail,
  fetchManagerMedicalEventDetailSuccess,
} from "./managerMedicalEventDetailSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* managerMedicalEventDetailSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const id = action.payload;
    const response = yield call(
      axios.get,
      `${URL_API}/manager/v1/medicalEvent/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("✅ managerMedicalEventDetailSaga:", response.data);
      yield put(fetchManagerMedicalEventDetailSuccess(response.data));
    } else {
      yield put(fetchManagerMedicalEventDetailFail(response.status));
    }
  } catch (error) {
    console.error("managerMedicalEventDetailSaga Error:", error);
    yield put(fetchManagerMedicalEventDetailFail(error));
  }
}

function* watchFetchManagerMedicalEventDetail() {
  yield takeLatest(
    FETCH__MANAGER__MEDICAL__EVENT__DETAIL,
    managerMedicalEventDetailSaga
  );
}

export default watchFetchManagerMedicalEventDetail;
