// 📄 updateManagerSupplySaga.js

import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  UPDATE_MANAGER_SUPPLY,
  updateManagerSupplyFail,
  updateManagerSupplySuccess,
} from "./rejectRequestManagerSlice";
import toast from "react-hot-toast";
import {
  fetchAllRequestFail,
  fetchAllRequestSuccess,
} from "../GetAllRequest/getAllRequestSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* updateManagerSupplySaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { id, status } = action.payload;

    const response = yield call(
      axios.put,
      `${URL_API}/manager/v1/${id}/approved`,
      { status: "APPROVED" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(updateManagerSupplySuccess(response.data));

      const fetchData = yield call(axios.get, `${URL_API}/manager/v1/request`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (fetchData.status === 200 || fetchData.status === 201) {
        yield put(fetchAllRequestSuccess(fetchData.data));
        toast.success("Aprroved Success");
      } else {
        yield put(fetchAllRequestFail(fetchData.status));
        toast.error("Aprroved Fail");
      }
    } else {
      yield put(updateManagerSupplyFail(response.status));
    }
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || error.message || "Unknown error";
    yield put(updateManagerSupplyFail(errMsg));
  }
}

export default function* watchUpdateManagerSupply() {
  yield takeLatest(UPDATE_MANAGER_SUPPLY, updateManagerSupplySaga);
}
