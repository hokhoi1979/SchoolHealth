import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH_DETAIL_REQUEST,
  fetchDetailRequestSuccess,
  fetchDetailRequestFail,
} from "./getDetailRequestSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function* detailRequestSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { requestID } = action.payload;
    const response = yield call(
      axios.get,
      `${URL_API}/parent/v1/medicineRequest/${requestID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchDetailRequestSuccess(response.data)); // response.data already contains the 'data' object with requestID, status, studentName, items
      console.log("LLL", response.data);
    } else {
      // Handle non-2xx status codes as errors
      yield put(
        fetchDetailRequestFail(
          new Error(`API returned status ${response.status}`)
        )
      );
    }
  } catch (error) {
    console.error("Error fetching detail request:", error); // Log error for debugging
    yield put(
      fetchDetailRequestFail(error.message || "An unknown error occurred")
    );
  }
}

function* watchFetchDetailRequest() {
  yield takeLatest(FETCH_DETAIL_REQUEST, detailRequestSaga);
}
export default watchFetchDetailRequest;
