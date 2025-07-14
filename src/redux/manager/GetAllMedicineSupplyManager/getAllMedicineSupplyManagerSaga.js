import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH__ALL__MEDICINE__SUPPLY__MANAGER,
  fetchAllMedicineSupplyManager,
  fetchAllMedicineSupplyManagerFail,
  fetchAllMedicineSupplyManagerSuccess,
} from "./getAllMedicineSupplyManagerSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* getAllMedicineSupplyManagerSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { page, limit } = action.payload;
    const response = yield call(
      axios.get,
      `${URL_API}/manager/v1/medicineSupply?page=${page}&limit=${limit}&sortBy=createdAt&order=asc`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchAllMedicineSupplyManagerSuccess(response.data));
      // yield put(fetchAllMedicineSupplyManager());
    } else {
      yield put(fetchAllMedicineSupplyManagerFail(response.status));
    }
  } catch (error) {
    yield put(fetchAllMedicineSupplyManagerFail(error));
  }
}

function* watchFetchAllMedicineSupplyManager() {
  yield takeLatest(
    FETCH__ALL__MEDICINE__SUPPLY__MANAGER,
    getAllMedicineSupplyManagerSaga
  );
}

export default watchFetchAllMedicineSupplyManager;
