import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH__MEDICINE__SUPPLY__MANAGER,
  fetchMedicineSupplyManagerFail,
  fetchMedicineSupplyManagerSucess,
} from "./getMedicineAndSupplyManagerSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* medicineSupplyManagerSaga() {
  try {
    const token = localStorage.getItem("accessToken");
    const response = yield call(axios.get, `${URL_API}/manager/v1/medicines`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("hdushdiu");
    console.log(">>>>>>>", response);

    if (response.status === 200 || response.status === 201) {
      yield put(fetchMedicineSupplyManagerSucess(response.data));
    } else {
      yield put(fetchMedicineSupplyManagerFail(response.status));
    }
  } catch (error) {
    yield put(fetchMedicineSupplyManagerFail(error));
  }
}

function* watchFetchMedicineSuppplyManager() {
  yield takeLatest(FETCH__MEDICINE__SUPPLY__MANAGER, medicineSupplyManagerSaga);
}

export default watchFetchMedicineSuppplyManager;
