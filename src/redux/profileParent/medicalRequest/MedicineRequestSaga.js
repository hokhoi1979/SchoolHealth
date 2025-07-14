import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_MEDICINE_REQUEST,
  fetchMedicineRequestSuccess,
  fetchMedicineRequestFail,
} from "./MedicineRequestSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* medicineRequestSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { query } = action.payload || {}; // Sửa đổi ở đây
    let url = `${URL_API}/parent/v1/medicineRequest`;
    const params = new URLSearchParams();

    if (query) {
      if (query.isBenefit !== undefined) {
        params.append("isBenefit", query.isBenefit);
      }
    }
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    const response = yield call(axios.get, url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || response.status === 201) {
      yield put(fetchMedicineRequestSuccess(response.data));
    } else {
      yield put(fetchMedicineRequestFail(error));
    }
  } catch (error) {
    yield put(fetchMedicineRequestFail(error));
  }
}

function* watchMedicineRequest() {
  yield takeLatest(FETCH_MEDICINE_REQUEST, medicineRequestSaga);
}

export default watchMedicineRequest;
