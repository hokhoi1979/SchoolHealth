import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH__MEDICAL__EVENT__DETAIL,
  fetchMedicalEventDetail,
  fetchMedicalEventDetailFail,
  fetchMedicalEventDetailSuccess,
} from "./getMedicalEventDetailSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* getMedicalEventDetailSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const id = action.payload;
    const response = yield call(
      axios.get,
      `${URL_API}/nurse/v1/medicalEvent/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchMedicalEventDetailSuccess(response.data));
      console.log("VIEW", response.data);
    } else {
      yield put(fetchMedicalEventDetailFail(response.status));
    }
  } catch (error) {
    yield put(fetchMedicalEventDetailFail(error));
  }
}

function* watchFetchMedicalEventDetail() {
  yield takeLatest(FETCH__MEDICAL__EVENT__DETAIL, getMedicalEventDetailSaga);
}

export default watchFetchMedicalEventDetail;
