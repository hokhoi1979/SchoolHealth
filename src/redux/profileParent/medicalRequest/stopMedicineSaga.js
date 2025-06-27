import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_STOP_MEDICINE,
  fetchStopMedicineSuccess,
  fetchStopMedicineFail,
} from "./stopMedicineSlice";
import axios from "axios";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;

function* stopMedicineSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const requestID = action.payload;
    const response = yield call(
      axios.put,
      `${URL_API}/parent/v1/medicineRequest/${requestID}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchStopMedicineSuccess(response.data));
      toast.success(response.data.message);
    } else {
      yield put(fetchStopMedicineFail(error));
      toast.error(response.data.message);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put(fetchStopMedicineFail(error));
    toast.error(errorMessage);
  }
}

function* watchFetchStopMedicine() {
  yield takeLatest(FETCH_STOP_MEDICINE, stopMedicineSaga);
}
export default watchFetchStopMedicine;
