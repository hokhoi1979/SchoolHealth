import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  REJECT__MANAGER__MEDICINE__SUPPLY,
  rejectManagerMedicineSupplyFail,
  rejectManagerMedicineSupplySuccess,
} from "./rejectMedicineSupplySlice";
import {
  fetchAllRequestFail,
  fetchAllRequestSuccess,
} from "../GetAllRequest/getAllRequestSlice";
import toast from "react-hot-toast";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* rejectMedicineSupplyManagerSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { id, body } = action.payload;

    const response = yield call(
      axios.put,
      `${URL_API}/manager/v1/${id}/rejected`,
      { status: "REJECTED" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(rejectManagerMedicineSupplySuccess(response.data));
      toast.success("Reject Success");
      const fetchData = yield call(axios.get, `${URL_API}/manager/v1/request`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (fetchData.status === 200 || fetchData.status === 201) {
        yield put(fetchAllRequestSuccess(fetchData.data));
      } else {
        yield put(fetchAllRequestFail(fetchData.status));
        toast.error("Reject Fail");
      }
    } else {
      yield put(rejectManagerMedicineSupplyFail(response.status));
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Đã có lỗi xảy ra";
    toast.error(`Reject Fail: ${errorMessage}`);
    yield put(rejectManagerMedicineSupplyFail(errorMessage));
  }
}

function* watchRejectMedicineSupplyManager() {
  yield takeLatest(
    REJECT__MANAGER__MEDICINE__SUPPLY,
    rejectMedicineSupplyManagerSaga
  );
}

export default watchRejectMedicineSupplyManager;
