// 📄 updateManagerSupplySaga.js

import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  UPDATE_MANAGER_SUPPLY,
  updateManagerSupplyFail,
  updateManagerSupplySuccess,
} from "./rejectRequestManagerSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* updateManagerSupplySaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const { id, status } = action.payload;

    const response = yield call(
      axios.put,
      `${URL_API}/manager/v1/request/${id}`,
      { status: "APPROVED" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("Success:", response.data);
      yield put(updateManagerSupplySuccess(response.data));
    } else {
      yield put(updateManagerSupplyFail(response.status));
    }
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || error.message || "Unknown error";
    yield put(updateManagerSupplyFail(errMsg));
    console.error(error);
  }
}

export default function* watchUpdateManagerSupply() {
  yield takeLatest(UPDATE_MANAGER_SUPPLY, updateManagerSupplySaga);
}
