import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH__REQUEST__DETAIL,
  fetchRequestDetail,
  fetchRequestDetailFail,
  fetchRequestDetailSuccess,
} from "./getDetailRequestSlice";
const URL_API = import.meta.env.VITE_API_URL;
function* getRequestDetailSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const id = action.payload;
    const response = yield call(
      axios.get,
      `${URL_API}/nurse/v1/medicine/send-request/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchRequestDetailSuccess(response.data));
    } else {
      yield put(fetchRequestDetailFail(response.status));
    }
  } catch (error) {
    yield put(fetchRequestDetailFail(error));
  }
}

function* watchFetchRequestDetailSaga() {
  yield takeLatest(FETCH__REQUEST__DETAIL, getRequestDetailSaga);
}

export default watchFetchRequestDetailSaga;
