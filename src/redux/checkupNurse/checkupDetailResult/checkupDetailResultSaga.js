import axios from "axios";

import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  CHECKUP__DETAIL__RESULT,
  fetchCheckupDetailResultFail,
  fetchCheckupDetailResultSuccess,
} from "./checkupDetailResultSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* checkupDetailResultSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const id = action.payload;
    const response = yield call(
      axios.get,
      `${URL_API}/nurse/v1/check-up/${id}/contents`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchCheckupDetailResultSuccess(response.data));
      console.log("DETAIL", response.data);
    } else {
      yield put(fetchCheckupDetailResultFail(response.status));
    }
  } catch (error) {
    yield put(fetchCheckupDetailResultFail(error));
  }
}

function* watchCheckupDetailResult() {
  yield takeLatest(CHECKUP__DETAIL__RESULT, checkupDetailResultSaga);
}

export default watchCheckupDetailResult;
