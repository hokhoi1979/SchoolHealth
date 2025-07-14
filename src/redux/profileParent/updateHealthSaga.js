import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH__UPDATE__HEALTH,
  fetchUpdateHealthFail,
  fetchUpdateHealthSucess,
} from "./updateHealthSlice";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast

const URL_API = import.meta.env.VITE_API_URL;

function* updateHealthSaga(action) {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
    const { studentID, ...healthData } = action.payload;

    const response = yield call(
      axios.put,
      `${URL_API}/parent/v1/health/${studentID}`,
      healthData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchUpdateHealthSucess(response.data));

      toast.success(response.data.message);
    } else {
      yield put(fetchUpdateHealthFail(response.status));
      toast.error(response.data.message);
    }
  } catch (error) {
    // Xử lý lỗi và hiển thị thông báo lỗi từ backend nếu có
    const errorMessage = error.response?.data?.message || error.message;
    yield put(
      fetchUpdateHealthFail({
        message: errorMessage,
        code: error.code,
        status: error.response?.status,
      })
    );
    toast.error(`Error updating health record: ${errorMessage}`);
  }
}

function* watchFetchUpdateHealth() {
  yield takeLatest(FETCH__UPDATE__HEALTH, updateHealthSaga);
}

export default watchFetchUpdateHealth;
