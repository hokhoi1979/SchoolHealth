// getDetailManagerClassifySaga.js

import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  FETCH__DETAIL__MANAGER__CLASSIFY,
  fetchDetailManagerClassifyFail,
  fetchDetailManagerClassifySuccess,
} from "./getDetailManagerClassifySlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* detailManagerClassifySaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const { id, page = 1, limit = 5 } = action.payload || {};

    const response = yield call(
      axios.get,
      `${URL_API}/manager/v1/medicine-classify/${id}?page=${page}&limit=${limit}&sortBy=createdAt&order=asc`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("DUCC", response.data);
      yield put(fetchDetailManagerClassifySuccess(response.data));
    } else {
      yield put(fetchDetailManagerClassifyFail(response.status));
    }
  } catch (error) {
    yield put(fetchDetailManagerClassifyFail(error));
    console.log("eror", error);
  }
}

function* watchFetchDetailManagerClassify() {
  yield takeLatest(FETCH__DETAIL__MANAGER__CLASSIFY, detailManagerClassifySaga);
}

export default watchFetchDetailManagerClassify;
