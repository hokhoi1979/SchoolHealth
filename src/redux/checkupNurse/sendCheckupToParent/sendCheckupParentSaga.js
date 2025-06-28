import axios from "axios";

import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  SEND__CHECKUP__PARENT,
  sendCheckupParentFail,
  sendCheckupParentSuccess,
} from "./sendCheckupParentSlice";
import {
  fetchCheckupResultFail,
  fetchCheckupResultSuccess,
} from "../resultCheckup/resultCheckupSlice";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;
function* sendCheckupParenSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const id = action.payload;
    const response = yield call(
      axios.post,
      `${URL_API}/nurse/v1/check-up/${id}/notification/send-result`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(sendCheckupParentSuccess(response.data));
      console.log("SUCCESS", response.data);
      toast.success("Send mail to Parent success");
      const fetch = yield call(
        axios.get,
        `${URL_API}/nurse/v1/check-up/${id}/result`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (fetch.status === 200 || fetch.status === 201) {
        yield put(fetchCheckupResultSuccess(fetch.data));
      } else {
        yield put(fetchCheckupResultFail(fetch.status));
      }
    } else {
      yield put(sendCheckupParentFail(response.status));
    }
  } catch (error) {
    yield put(sendCheckupParentFail(error));
  }
}

function* watchSendCheckupParent() {
  yield takeLatest(SEND__CHECKUP__PARENT, sendCheckupParenSaga);
}

export default watchSendCheckupParent;
