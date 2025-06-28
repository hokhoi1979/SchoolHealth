import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  ACCEPT__MEDICINE__REQUEST,
  acceptMedicineRequestFail,
  acceptMedicineRequestSuccess,
} from "./acceptMedicineRequestSlice";
import {
  fetchMedicineRequestFail,
  fetchMedicineRequestSuccess,
} from "../getMedicineRequest/getMedicineRequestSlice";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;
function* acceptMedicineRequestSaga(action) {
  try {
    const id = action.payload;
    const token = yield select((state) => state.account.token);

    const response = yield call(
      axios.put,
      `${URL_API}/nurse/v1/medicineRequest/accepted/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(acceptMedicineRequestSuccess(response.data));
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
      yield put(acceptMedicineRequestFail(response.status));
    }
  } catch (error) {
    yield put(
      acceptMedicineRequestFail(error?.response?.data || error.message)
    );
  }
}

function* watchAcceptMedicineRequest() {
  yield takeLatest(ACCEPT__MEDICINE__REQUEST, acceptMedicineRequestSaga);
}

export default watchAcceptMedicineRequest;
