import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { toast } from "react-toastify";
import {
  POST__MANAGER__CHECKUP,
  postManagerFailCheckup,
  postManagerSuccessCheckup,
} from "./PostCheckUpManagerSlice";
import {
  fetchCheckupManagerFail,
  fetchCheckupManagerSuccess,
} from "../GetAllCheckUpManager/getAllCheckUpManagerSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* managerCheckupSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const body = action.payload;

    const response = yield call(
      axios.post,
      `${URL_API}/manager/v1/check-up`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(postManagerSuccessCheckup(response.data));
      toast.success("Create Check Up Success");
      const fecthData = yield call(
        axios.get,
        `${URL_API}/manager/v1/check-up`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (fecthData.status === 200 || fecthData.status === 201) {
        yield put(fetchCheckupManagerSuccess(fecthData.data));
      } else {
        yield put(fetchCheckupManagerFail(fecthData.status));
      }
    } else {
      yield put(postManagerFailCheckup(`API ERROR: ${response.status}`));
      toast.error(response.data.message);
    }
  } catch (error) {
    yield put(postManagerFailCheckup(`API ERROR: ${error}`));
    const message =
      error.response?.data?.message ||
      error?.message ||
      "Đã xảy ra lỗi. Vui lòng thử lại.";
    toast.error(message);
  }
}

function* watchPostManagerCheckup() {
  yield takeLatest(POST__MANAGER__CHECKUP, managerCheckupSaga);
}

export default watchPostManagerCheckup;
