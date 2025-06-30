import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH__CREATE__HEALTH,
  fetchCreateHealthFail,
  fetchCreateHealthSucess,
} from "./createHealthSlice";
import axios from "axios";
import { toast } from "react-toastify";
import {
  fetchParentHealthFail,
  fetchParentHealthSuccess,
} from "./parentGetHealth/parentGetHealthSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* createHealthSaga(action) {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
    const body = action.payload;
    const response = yield call(
      axios.post,
      `${URL_API}/parent/v1/health`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchCreateHealthSucess(response.data));
      toast.success("Create student health successful!");
      const fetch = yield call(axios.get, `${URL_API}/parent/v1/health`, {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 Add "Bearer"
          "Content-Type": "application/json",
        },
      });

      if (fetch.status === 200 || fetch.status === 201) {
        yield put(fetchParentHealthSuccess(fetch.data.data));
        console.log(fetch.data);
      } else {
        yield put(fetchParentHealthFail(error));
      }
    } else {
      yield put(fetchCreateHealthFail(`Status: ${response.status}`));
      console.log("EROR", response.status);
      toast.error(response.data.message);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put(fetchCreateHealthFail(error.message || "Unknown error"));
    toast.error(`Error updating health record: ${errorMessage}`);
  }
}

function* watchFetchCreateHealth() {
  yield takeLatest(FETCH__CREATE__HEALTH, createHealthSaga);
}

export default watchFetchCreateHealth;
