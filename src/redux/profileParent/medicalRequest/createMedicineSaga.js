import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH_CREATE_MEDICINE,
  fetchCreateMedicineSuccess,
  fetchCreateMedicineFail,
} from "./createMedicineSlice";
import axios from "axios";
import { toast } from "react-toastify";
import {
  fetchMedicineRequestFail,
  fetchMedicineRequestSuccess,
} from "./MedicineRequestSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* createMedicineSaga(action) {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
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

      let url = `${URL_API}/parent/v1/medicineRequest`;
      const fetch = yield call(axios.get, url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (fetch.status === 200 || fetch.status === 201) {
        yield put(fetchMedicineRequestSuccess(fetch.data));
        console.log(fetch.data);
      } else {
        yield put(fetchMedicineRequestFail(error));
      }
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
