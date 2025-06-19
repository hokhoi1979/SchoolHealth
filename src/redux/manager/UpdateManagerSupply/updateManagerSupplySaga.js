import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PUT__MANAGER__SUPPLY,
  putManagerFailSupply,
  putManagerSuccessSupply,
  putManagerSupply,
} from "./updateManagerSupplySlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* updateManagerSupplySaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const { id, ...data } = action.payload;
    const response = yield call(
      axios.patch,
      `${URL_API}/manager/v1/medicineSupply/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("DUCC", response.data);
      yield put(putManagerSuccessSupply(response.data));
    } else {
      yield put(putManagerFailSupply(response.status));
    }
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || error.message || "Unknown error";
    yield put(putManagerFailSupply(errMsg));
    console.log(error);
  }
}

function* watchPutManagerSupply() {
  yield takeLatest(PUT__MANAGER__SUPPLY, updateManagerSupplySaga);
}

export default watchPutManagerSupply;
