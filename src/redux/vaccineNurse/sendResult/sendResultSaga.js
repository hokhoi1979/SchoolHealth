import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  POST__RESULT__VACCINE,
  postResultVaccineFail,
  postResultVaccineSuccess,
} from "./sendResultSlice";
import {
  fetchVaccineResultFail,
  fetchVaccineResultSuccess,
} from "../vaccineResult/vaccineResultSlice";
import { message } from "antd";

const URL_API = import.meta.env.VITE_API_URL;

function* sendResultVaccineSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const id = action.payload;

    const response = yield call(
      axios.post,
      `${URL_API}/nurse/v1/${id}/notification/send-result`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(postResultVaccineSuccess(response.data));
      message.success("Gửi kết quả tiêm thành công");

      const fetchResponse = yield call(
        axios.get,
        `${URL_API}/nurse/v1/${id}/result`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (fetchResponse.status === 200 || fetchResponse.status === 201) {
        yield put(fetchVaccineResultSuccess(fetchResponse.data));
      } else {
        yield put(fetchVaccineResultFail(fetchResponse.status));
      }
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Gửi kết quả tiêm thất bại!";
    yield put(postResultVaccineFail(errorMessage));
    message.error(errorMessage);
  }
}

function* watchPostResultSaga() {
  yield takeLatest(POST__RESULT__VACCINE, sendResultVaccineSaga);
}

export default watchPostResultSaga;
