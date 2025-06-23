import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  POST__REQUEST__MEDICINE,
  postRequestMedicineFail,
  postRequestMedicineSuccess,
} from "./sendRequestMedicineSLice";
import { fetchRequestMedicine } from "../getSendRequestMedicine/getRequestMedicineSlice";
const URL_API = import.meta.env.VITE_API_URL;

function* postRequestMedicineSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const response = yield call(
      axios.post,
      `${URL_API}/nurse/v1/medicine/send-request`,
      action.payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(postRequestMedicineSuccess(response.data));
      console.log("SUCCESS", response.data);
      yield put(fetchRequestMedicine());
    }
  } catch (error) {
    yield put(postRequestMedicineFail(error.response?.data || error.message));
  }
}

function* watchPostRequestMedicine() {
  yield takeLatest(POST__REQUEST__MEDICINE, postRequestMedicineSaga);
}

export default watchPostRequestMedicine;
