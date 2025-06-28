import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH__MEDICINE__DETAIL__REQUEST,
  fetchMedicineDetailRequestFail,
  fetchMedicineDetailRequestSuccess,
} from "./getMedicineDetailRequestSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* getMedicineDetailRequestSaga(action) {
  try {
    const id = action.payload;
    const token = yield select((state) => state.account.token);

    const response = yield call(
      axios.get,
      `${URL_API}/nurse/v1/medicineRequest/${id}`,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchMedicineDetailRequestSuccess(response.data));
      console.log("DETAIL", response.data);
    } else {
      yield put(fetchMedicineDetailRequestFail(response.status));
    }
  } catch (error) {
    yield put(fetchMedicineDetailRequestFail(error));
  }
}

function* watchFetchMedicineDetailRequest() {
  yield takeLatest(
    FETCH__MEDICINE__DETAIL__REQUEST,
    getMedicineDetailRequestSaga
  );
}

export default watchFetchMedicineDetailRequest;
