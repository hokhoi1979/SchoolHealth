import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_CREATE_MEDICINE,
  fetchCreateMedicineSuccess,
  fetchCreateMedicineFail,
} from "./createMedicineSlice";
import axios from "axios";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;

function* createMedicineSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const body = action.payload;
    const response = yield call(
      axios.post,
      `${URL_API}/parent/v1/medicineRequest`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchCreateMedicineSuccess(response.data));
      toast.success(response.data.message);
    } else {
      yield put(fetchCreateMedicineFail(`Status: ${response.status}`));
      console.log("EROR", response.status);
      toast.error(response.data.message);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put(fetchCreateMedicineFail(error.message || "Unknown error"));
    toast.error(`Error updating health record: ${errorMessage}`);
  }
}

function* watchFetchCreateMedicine() {
  yield takeLatest(FETCH_CREATE_MEDICINE, createMedicineSaga);
}
export default watchFetchCreateMedicine;
