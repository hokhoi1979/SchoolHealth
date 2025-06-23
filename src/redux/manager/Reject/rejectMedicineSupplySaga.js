import { call, put, takeLatest } from "redux-saga/effects";
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

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* rejectMedicineSupplyManagerSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
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

      const fetchData = yield call(axios.get, `${URL_API}/manager/v1/request`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (fetchData.status === 200 || fetchData.status === 201) {
        console.log("DUCC", fetchData.data);
        yield put(fetchAllRequestSuccess(fetchData.data));
        toast.success("Reject Success");
      } else {
        yield put(fetchAllRequestFail(fetchData.status));
        toast.error("Reject Fail");
      }
    } else {
      yield put(rejectManagerMedicineSupplyFail(response.status));
    }
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || error.message || "Unknown error";
    yield put(rejectManagerMedicineSupplyFail(errMsg));
    console.log(error);
  }
}

function* watchRejectMedicineSupplyManager() {
  yield takeLatest(
    REJECT__MANAGER__MEDICINE__SUPPLY,
    rejectMedicineSupplyManagerSaga
  );
}

export default watchRejectMedicineSupplyManager;
