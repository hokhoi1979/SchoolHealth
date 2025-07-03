// confirmMedicalCheckupManagerSaga.js
import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PATCH__MANAGER__CONFIRM__CHECKUP,
  patchManagerFailConfirmCheckup,
  patchManagerSuccessConfirmCheckup,
} from "./confirmMedicalCheckupManagerSlice";
import { toast } from "react-toastify";
import {
  fetchCheckupManagerFail,
  fetchCheckupManagerSuccess,
} from "../GetAllCheckUpManager/getAllCheckUpManagerSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* patchCheckupConfirmManagerSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { id, ...restPayload } = action.payload;

    const response = yield call(
      axios.put,
      `${URL_API}/manager/v1/check-up/${id}`,
      restPayload,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(patchManagerSuccessConfirmCheckup(response.data));
      toast.success("Confirm Success");

      const fetchData = yield call(
        axios.get,
        `${URL_API}/manager/v1/check-up`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (fetchData.status === 200 || fetchData.status === 201) {
        yield put(fetchCheckupManagerSuccess(fetchData.data));
      } else {
        yield put(fetchCheckupManagerFail(fetchData.status));
      }
    } else {
      yield put(patchManagerFailConfirmCheckup(fetchData.status));
    }
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || error.message || "Unknown error";
    yield put(patchManagerFailConfirmCheckup(errMsg));
    console.log(error);
    toast.error("Confirm Fail");
  }
}

function* watchPatchCheckupConfirmManager() {
  yield takeLatest(
    PATCH__MANAGER__CONFIRM__CHECKUP,
    patchCheckupConfirmManagerSaga
  );
}

export default watchPatchCheckupConfirmManager;
