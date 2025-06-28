import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { toast } from "react-toastify";
import {
  FETCH__LOWSTOCK,
  fetchLowStock,
  fetchLowStockFail,
  fetchLowStockSuccess,
} from "./getLowStockSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* fetchLowStockSaga() {
  try {
    const token = yield select((state) => state.account.token);

    const response = yield call(
      axios.get,
      `${URL_API}/nurse/v1/medicineRequest/low-stock`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchLowStockSuccess(response.data));
      console.log("STOCK", response.data);
    } else {
      yield put(fetchLowStockFail(response.status));
    }
  } catch (error) {
    yield put(fetchLowStockFail(error));
  }
}

function* watchFetchLowStock() {
  yield takeLatest(FETCH__LOWSTOCK, fetchLowStockSaga);
}

export default watchFetchLowStock;
