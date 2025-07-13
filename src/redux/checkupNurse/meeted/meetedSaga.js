import axios from "axios";

import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH__MEETED,
  fetchMeetedFail,
  fetchMeetedSuccess,
} from "./meetedSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* meetedSaga() {
  try {
    const token = yield select((state) => state.account.token);

    const response = yield call(
      axios.get,
      `${URL_API}/nurse/v1/check-up/meeting`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchMeetedSuccess(response.data));
    } else {
      yield put(fetchMeetedFail(response.status));
    }
  } catch (error) {
    yield put(fetchMeetedFail(response.status));
  }
}

function* watchMeeted() {
  yield takeLatest(FETCH__MEETED, meetedSaga);
}

export default watchMeeted;
