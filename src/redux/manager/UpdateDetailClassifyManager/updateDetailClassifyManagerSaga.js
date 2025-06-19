import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  PUT__MANAGER__CLASSIFY,
  putManagerClassifyFail,
  putManagerClassifySuccess,
} from "./updateDetailClassifyManagerSlice";
import { fetchDetailManagerClassify } from "../GetDetallManagerClassify/getDetailManagerClassifySlice";
import { fetchMedicineClasstifyManager } from "../GetManagerMedineClassify/getManagerMedicineClassifySlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* updateClassifyManagerSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const { id, formData } = action.payload;

    const response = yield call(
      axios.patch,
      `${URL_API}/manager/v1/medicine/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("DUCC CLASSIFY", response.data);

      yield put(putManagerClassifySuccess(response.data));
      yield put(fetchDetailManagerClassify());
      yield put(fetchMedicineClasstifyManager());
    } else {
      yield put(putManagerClassifyFail(`Status code: ${response.status}`));
    }
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || error.message || "Unknown error";
    yield put(putManagerClassifyFail(errMsg));
    console.log(error);
  }
}

function* watchPutClassifyManager() {
  yield takeLatest(PUT__MANAGER__CLASSIFY, updateClassifyManagerSaga);
}

export default watchPutClassifyManager;
