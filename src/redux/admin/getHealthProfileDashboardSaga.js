import { call, put, takeLatest, select, take } from "redux-saga/effects";
import {
  HEALTH_PROFILE_DASHBOARD,
  healthProfileDashboardSuccess,
  healthProfileDashboardFail,
} from "./getHealthProfileDashboardSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function* healthProfileDashboardSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const body = action.payload;
    const response = yield call(
      axios.post,
      `${URL_API}/admin/v1/dashboard/healthProfile`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: body,
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(healthProfileDashboardSuccess(response.data.data));
    } else {
      yield put(healthProfileDashboardFail(response.status));
    }
  } catch (error) {
    yield put(healthProfileDashboardFail(error));
  }
}

function* watchHealthProfileDashboard() {
  yield takeLatest(HEALTH_PROFILE_DASHBOARD, healthProfileDashboardSaga);
}
export default watchHealthProfileDashboard;
