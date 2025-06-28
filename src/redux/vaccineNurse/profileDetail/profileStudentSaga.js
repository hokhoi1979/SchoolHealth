import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH__PROFILE__DETAIL,
  fetchProfileDetailFail,
  fetchProfileDetailSuccess,
} from "./profileStudentSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function* profileStudentSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const id = action.payload;
    const response = yield call(axios.get, `${URL_API}/nurse/v1/health/${id}`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201 || response.status === 200) {
      console.log("DETAIL", response.data);
      yield put(fetchProfileDetailSuccess(response.data));
    } else {
      yield put(fetchProfileDetailFail(response.status));
    }
  } catch (error) {
    yield put(fetchProfileDetailFail(error));
  }
}

function* watchFetchProfileDetail() {
  yield takeLatest(FETCH__PROFILE__DETAIL, profileStudentSaga);
}

export default watchFetchProfileDetail;
