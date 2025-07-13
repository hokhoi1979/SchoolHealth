import axios from "axios";

import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH__CHECKUP__JOIN,
  fetchCheckupJoinFail,
  fetchCheckupJoinSuccess,
} from "./checkupJoinSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* checkupJoinSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const id = action.payload;

    const response = yield call(
      axios.get,
      `${URL_API}/nurse/v1/check-up/${id}/students-result-status`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchCheckupJoinSuccess(response.data));
    } else {
      yield put(fetchCheckupJoinFail(response.status));
    }
  } catch (error) {
    yield put(fetchCheckupJoinFail(error));
  }
}

function* watchCheckupJoin() {
  yield takeLatest(FETCH__CHECKUP__JOIN, checkupJoinSaga);
}

export default watchCheckupJoin;
