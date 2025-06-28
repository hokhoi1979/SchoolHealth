import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PUT__MANAGER__MEDICAL__CHECKUP,
  putManagerSuccessMedicalCheckup,
  putManagerFailMedicalCheckup,
} from "./updateMedicalCheckupManagerSlice";
import {
  fetchCheckupManagerFail,
  fetchCheckupManagerSuccess,
} from "../GetAllCheckUpManager/getAllCheckUpManagerSlice";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* updateMedicalCheckupManagerSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const { id, ...data } = action.payload;

    const response = yield call(
      axios.patch,
      `${URL_API}/manager/v1/check-up/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(putManagerSuccessMedicalCheckup(response.data));
      console.log("Update success", response.data);
      toast.success("Update Success");
    } else {
      yield put(putManagerFailMedicalCheckup(response.status));
    }
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || error.message || "Unknown error";
    yield put(putManagerFailMedicalCheckup(errMsg));
    console.log(error);
    toast.error("Update Fail");
  }
}

function* watchUpdateMedicalCheckupManager() {
  yield takeLatest(
    PUT__MANAGER__MEDICAL__CHECKUP,
    updateMedicalCheckupManagerSaga
  );
}

export default watchUpdateMedicalCheckupManager;
