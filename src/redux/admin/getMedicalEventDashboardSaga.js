import { call, put, takeLatest, select, take } from "redux-saga/effects";
import {
  MEDICAL_EVENT_DASHBOARD,
  medicalEventDashboardSuccess,
  medicalEventDashboardFail,
} from "./getMedicalEventDashboardSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;

function* medicalEventDashboardSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const body = action.payload;
    const response = yield call(
      axios.post,
      `${URL_API}/admin/v1/dashboard/medicalEvent`,
      null, // POST body là null vì bạn dùng query params
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: body, // truyền `from`, `to`, `filter`, `classID` ở đây
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(medicalEventDashboardSuccess(response.data.data));
    } else {
      yield put(medicalEventDashboardFail(response.status));
    }
  } catch (error) {
    yield put(medicalEventDashboardFail(error));
  }
}

function* watchMedicalEventDashboard() {
  yield takeLatest(MEDICAL_EVENT_DASHBOARD, medicalEventDashboardSaga);
}
export default watchMedicalEventDashboard;
