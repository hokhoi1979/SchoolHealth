import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  SEND__MEDICAL__EVENT,
  sendMedicalEventFail,
  sendMedicalEventSuccess,
} from "./sendMedicalEventSlice";
import { toast } from "react-toastify";
import {
  fetchMedicalEventFail,
  fetchMedicalEventSuccess,
} from "../medicalEvent/getMedicalEventSlice";
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
      toast.success("Send email to parent successful!");

      const fetch = yield call(axios.get, `${URL_API}/nurse/v1/medicalEvent`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (fetch.status === 200 || fetch.status === 201) {
        yield put(fetchMedicalEventSuccess(fetch.data));
      } else {
        yield put(fetchMedicalEventFail(fetch.status));
      }
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
