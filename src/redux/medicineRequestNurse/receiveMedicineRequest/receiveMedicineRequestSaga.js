import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";

import {
  fetchMedicineRequestFail,
  fetchMedicineRequestSuccess,
} from "../getMedicineRequest/getMedicineRequestSlice";
import { toast } from "react-toastify";
import {
  RECEIVE__MEDICINE__REQUEST,
  receiveMedicineRequestFail,
  receiveMedicineRequestSuccess,
} from "./receiveMedicineRequestSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* receiveMedicineRequestSaga(action) {
  try {
    const id = action.payload;
    const token = yield select((state) => state.account.token);

    const response = yield call(
      axios.put,
      `${URL_API}/nurse/v1/medicineRequest/received/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(receiveMedicineRequestSuccess(response.data));
      toast.success("Accept successful!");

      const updated = yield call(
        axios.get,
        `${URL_API}/nurse/v1/medicineRequest`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (updated.status === 200 || updated.status === 201) {
        yield put(fetchMedicineRequestSuccess(updated.data));
      } else {
        yield put(fetchMedicineRequestFail(updated.status));
      }
    } else {
      yield put(receiveMedicineRequestFail(response.status));
    }
  } catch (error) {
    yield put(
      receiveMedicineRequestFail(error?.response?.data || error.message)
    );
  }
}

function* watchReceiveMedicineRequest() {
  yield takeLatest(RECEIVE__MEDICINE__REQUEST, receiveMedicineRequestSaga);
}

export default watchReceiveMedicineRequest;
