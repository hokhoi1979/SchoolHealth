import axios from "axios";

import { call, put, takeLatest } from "redux-saga/effects";

import { toast } from "react-toastify";
import {
  POST__CHECKUP__DETAIL_RESULT,
  postCheckupDetailResultFail,
  postCheckupDetailResultSuccess,
} from "./sendCheckupDetailResultSlice";
import {
  fetchCheckupJoinFail,
  fetchCheckupJoinSuccess,
} from "../checkupJoin/checkupJoinSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* postCheckupDetailResultSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const { id, body } = action.payload;
    const response = yield call(
      axios.post,
      `${URL_API}/nurse/v1/check-up/${id}/result`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(postCheckupDetailResultSuccess(response.data));
      toast.success("Send successful!");

      const fetch = yield call(
        axios.get,
        `${URL_API}/nurse/v1/check-up/${id}/students-result-status`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (fetch.status === 200 || fetch.status === 201) {
        yield put(fetchCheckupJoinSuccess(fetch.data));
        console.log("JOIN", fetch.data);
      } else {
        yield put(fetchCheckupJoinFail(fetch.status));
      }
    } else {
      yield put(postCheckupDetailResultFail(response.status));
    }
  } catch (error) {
    yield put(postCheckupDetailResultFail(error));
  }
}

function* watchPostCheckupResult() {
  yield takeLatest(POST__CHECKUP__DETAIL_RESULT, postCheckupDetailResultSaga);
}

export default watchPostCheckupResult;
