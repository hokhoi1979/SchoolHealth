import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  PUT__MANAGER__CLASSIFY,
  putManagerClassifyFail,
  putManagerClassifySuccess,
} from "./updateDetailClassifyManagerSlice";
import {
  fetchDetailManagerClassify,
  fetchDetailManagerClassifyFail,
  fetchDetailManagerClassifySuccess,
} from "../GetDetallManagerClassify/getDetailManagerClassifySlice";
import {
  fetchMedicineClasstifyManager,
  fetchMedicineClasstifyManagerFail,
  fetchMedicineClasstifyManagerSucess,
} from "../GetManagerMedineClassify/getManagerMedicineClassifySlice";
import toast from "react-hot-toast";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* updateClassifyManagerSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
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
      yield put(putManagerClassifySuccess(response.data));
      toast.success("Update Success");

      const fetchData = yield call(
        axios.get,
        `${URL_API}/manager/v1/medicine-classify?page=1&limit=8sortBy=createdAt&order=asc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (fetchData.status === 200 || fetchData.status === 201) {
        console.log("DUCC", fetchData.data);

        yield put(fetchMedicineClasstifyManagerSucess(fetchData.data));
      } else {
        yield put(fetchMedicineClasstifyManagerFail(fetchData.status));
      }
    } else {
      yield put(putManagerClassifyFail(`Status code: ${response.status}`));
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Đã có lỗi xảy ra";
    toast.error(`Lỗi update: ${errorMessage}`);
    yield put(putManagerClassifyFail(errorMessage));
    console.error("Lỗi update::", error);
  }
}

function* watchPutClassifyManager() {
  yield takeLatest(PUT__MANAGER__CLASSIFY, updateClassifyManagerSaga);
}

export default watchPutClassifyManager;
