import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH_DECLINE_VACCINE,
  fetchDeclineVaccineSuccess,
  fetchDeclineVaccineFail,
} from "./getVaccineParentDeclineSlice";
import axios from "axios";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;

function* getVaccineParentDeclineSaga(action) {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
    const { vaccinationEventID, studentID, note } = action.payload;

    const response = yield call(
      axios.put,
      `${URL_API}/parent/v1/${vaccinationEventID}/${studentID}/declined`,
      { note: note },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchDeclineVaccineSuccess(response.data));
      toast.success(response.data.message);
    } else {
      yield put(fetchDeclineVaccineFail(response.status));
      toast.error(response.data.message);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put(
      fetchDeclineVaccineFail({
        message: error.message,
        code: error.code,
        status: error.response?.status,
        data: error.response?.data,
      })
    );
    toast.error(errorMessage);
  }
}

function* watchFetchDeclineVaccine() {
  yield takeLatest(FETCH_DECLINE_VACCINE, getVaccineParentDeclineSaga);
}
export default watchFetchDeclineVaccine;
