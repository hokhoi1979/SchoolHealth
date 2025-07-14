import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { fetchMedicalEventSuccess } from "../medicalEvent/getMedicalEventSlice";
import {
  PATCH__HOSPITAL__EVENT,
  patchHospitalEventFail,
  patchHospitalEventSuccess,
} from "./editHospitalEventSlice";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;
function* hospitalEventSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const id = action.payload;
    const response = yield call(
      axios.patch,
      `${URL_API}/nurse/v1/medicalEvent/change-status/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(patchHospitalEventSuccess(response.data));
      toast.success("Confirm successful!");
      const fetchData = yield call(
        axios.get,
        `${URL_API}/nurse/v1/medicalEvent`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (fetchData.status === 200 || fetchData.status === 201) {
        yield put(fetchMedicalEventSuccess(fetchData.data));
      } else {
        yield put(fetchMedicalEventFail(fetchData.status));
      }
    } else {
      yield put(patchHospitalEventFail(response.status));
      toast.error("You have already confirmed!");
    }
  } catch (error) {
    yield put(patchHospitalEventFail(error));
  }
}

function* watchPatchHospitalEvent() {
  yield takeLatest(PATCH__HOSPITAL__EVENT, hospitalEventSaga);
}

export default watchPatchHospitalEvent;
