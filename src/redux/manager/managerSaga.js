import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH__MANAGER__MEDICAL,
  fetchManagerSucessMedical,
  fetchMangerFailMedical,
} from "./managerSlice";
const URL_API = import.meta.env.VITE_API_URL;

function* managerMedicalSaga() {
  try {
    const token = localStorage.getItem("accessToken");
    const response = yield call(axios.get, `${URL_API}/manager/v1/class`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      yield put(fetchManagerSucessMedical(response.data));
    } else {
      yield put(fetchMangerFailMedical(`API ERROR: ${response.data}`));
    }
  } catch (error) {
    yield put(fetchMangerFailMedical(`API ERROR: ${error}`));
  }
}
function* watchFetchManagerMedical() {
  yield takeLatest(FETCH__MANAGER__MEDICAL, managerMedicalSaga);
}

export default watchFetchManagerMedical;
