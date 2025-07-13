import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";

import {
  fetchMedicineRequestFail,
  fetchMedicineRequestSuccess,
} from "../getMedicineRequest/getMedicineRequestSlice";
import { toast } from "react-toastify";
import {
  STOP__PROVIDE__MEDICINE,
  stopProvideMedicinceFail,
  stopProvideMedicinceSuccess,
} from "./stopProvideMedicineSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* stopProvideMedicinceSaga(action) {
  try {
    const id = action.payload;
    const token = yield select((state) => state.account.token);

    const response = yield call(
      axios.put,
      `${URL_API}/nurse/v1/medicineRequest/benefit/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(stopProvideMedicinceSuccess(response.data));
      toast.success("Send to parent stop provide medicine successful!");

      const fetch = yield call(
        axios.get,
        `${URL_API}/nurse/v1/medicineRequest`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (fetch.status === 200 || fetch.status === 201) {
        yield put(fetchMedicineRequestSuccess(fetch.data));
      } else {
        yield put(fetchMedicineRequestFail(fetch.status));
      }
    } else {
      yield put(stopProvideMedicinceFail(response.status));
    }
  } catch (error) {
    yield put(stopProvideMedicinceFail(error));
  }
}

function* watchStopProvideMedicine() {
  yield takeLatest(STOP__PROVIDE__MEDICINE, stopProvideMedicinceSaga);
}

export default watchStopProvideMedicine;
