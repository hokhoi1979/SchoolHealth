import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH__MEDICINE__SUPPLY,
  fetchMedicineSupplyFail,
  fetchMedicineSupplySuccess,
} from "./getMedicineSuppliesSlice";
const URL_API = import.meta.env.VITE_API_URL;

function* getMedicineSupplySaga() {
  try {
    const token = localStorage.getItem("accessToken");
    const response = yield call(
      axios.get,
      `${URL_API}/nurse/v1/medicine-supply`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchMedicineSupplySuccess(response.data));
    } else {
      yield put(fetchMedicineSupplyFail(response.status));
    }
  } catch (error) {
    yield put(fetchMedicineSupplyFail(error));
  }
}

function* watchFetchMedicineSupply() {
  yield takeLatest(FETCH__MEDICINE__SUPPLY, getMedicineSupplySaga);
}

export default watchFetchMedicineSupply;
