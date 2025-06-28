import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_DELETE_MEDICINE,
  fetchDeleteMedicineSuccess,
  fetchDeleteMedicineFail,
} from "./deleteMedicineSlice";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;

function* deleteMedicineSaga(action) {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
    const response = yield call(
      axios.delete,
      `${URL_API}/parent/v1/medicineRequest/${action.payload}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 204) {
      yield put(fetchDeleteMedicineSuccess(action.payload));
      toast.success(response.data.message);
    } else {
      yield put(fetchDeleteMedicineFail("Delete failed"));
      toast.error(response.data.message);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put(fetchDeleteMedicineFail(error.message));
    toast.error(`Error updating health record: ${errorMessage}`);
  }
}

function* watchDeleteMedicine() {
  yield takeLatest(FETCH_DELETE_MEDICINE, deleteMedicineSaga);
}

export default watchDeleteMedicine;
