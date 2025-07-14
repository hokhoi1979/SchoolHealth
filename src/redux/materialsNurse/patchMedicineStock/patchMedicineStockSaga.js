import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PATCH__QUANTITY__STOCK,
  patchQuantityStockFail,
  patchQuantityStockSuccess,
} from "./patchMedicineStockSlice";
import {
  fetchLowStockFail,
  fetchLowStockSuccess,
} from "../getLowStock/getLowStockSlice";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;
function* patchQuantityStockSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const { id, body } = action.payload;
    const response = yield call(
      axios.patch,
      `${URL_API}/nurse/v1/medicineRequest/medicine-item/${id}/update-quantity`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(patchQuantityStockSuccess(response.data));
      toast.success("Update quantity successful!");

      const fetch = yield call(
        axios.get,
        `${URL_API}/nurse/v1/medicineRequest/low-stock`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (fetch.status === 200 || fetch.status === 201) {
        yield put(fetchLowStockSuccess(fetch.data));
      } else {
        yield put(fetchLowStockFail(fetch.status));
      }
    } else {
      yield put(patchQuantityStockFail(response.status));
    }
  } catch (error) {
    yield put(patchQuantityStockFail(error));
  }
}

function* watchPatchQuantityStock() {
  yield takeLatest(PATCH__QUANTITY__STOCK, patchQuantityStockSaga);
}

export default watchPatchQuantityStock;
