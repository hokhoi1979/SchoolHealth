import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  REJECT__MEDICINE__REQUEST,
  rejectMedicineRequestFail,
  rejectMedicineRequestSuccess,
} from "./rejectMedicineRequestSlice";
import {
  fetchMedicineRequestFail,
  fetchMedicineRequestSuccess,
} from "../getMedicineRequest/getMedicineRequestSlice";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;
function* rejectMedicineRequestSaga(action) {
  try {
    const id = action.payload;
    const token = yield select((state) => state.account.token);

    const response = yield call(
      axios.put,
      `${URL_API}/nurse/v1/medicineRequest/rejected/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(rejectMedicineRequestSuccess(response.data));
      toast.success("Reject successful!");
      const reject = yield call(
        axios.get,
        `${URL_API}/nurse/v1/medicineRequest`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (reject.status === 200 || reject.status === 201) {
        yield put(fetchMedicineRequestSuccess(reject.data));
      } else {
        yield put(fetchMedicineRequestFail(reject.status));
      }
    } else {
      yield put(rejectMedicineRequestFail(response.status));
    }
  } catch (error) {
    yield put(
      rejectMedicineRequestFail(error?.response?.data || error.message)
    );
  }
}

function* watchRejectMedicineRequest() {
  yield takeLatest(REJECT__MEDICINE__REQUEST, rejectMedicineRequestSaga);
}

export default watchRejectMedicineRequest;
