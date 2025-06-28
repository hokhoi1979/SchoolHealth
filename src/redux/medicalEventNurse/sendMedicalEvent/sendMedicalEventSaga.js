import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  SEND__MEDICAL__EVENT,
  sendMedicalEventFail,
  sendMedicalEventSuccess,
} from "./sendMedicalEventSlice";
const URL_API = import.meta.env.VITE_API_URL;
function* sendMedicalEventSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const id = action.payload;
    const response = yield call(
      axios.post,
      `${URL_API}/nurse/v1/medicalEvent/send-medicalEvent/${id}`,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(sendMedicalEventSuccess(response.data));
      console.log("SEND", response.data);
    } else {
      yield put(sendMedicalEventFail(response.status));
    }
  } catch (error) {
    yield put(sendMedicalEventFail(error));
  }
}

function* watchSendMedicalEvent() {
  yield takeLatest(SEND__MEDICAL__EVENT, sendMedicalEventSaga);
}

export default watchSendMedicalEvent;
