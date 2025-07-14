import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH_ACCEPT_VACCINE,
  fetchAcceptVaccineSuccess,
  fetchAcceptVaccineFail,
} from "./getVaccineParentAcceptSlice";
import axios from "axios";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;

function* getVaccineParentAcceptSaga(action) {
  try {
    // const token = localStorage.getItem("accessToken");
    const token = yield select((state) => state.account.token);
    const { studentID, vaccinationEventID } = action.payload; // Sửa tại đây
    const response = yield call(
      axios.put,
      `${URL_API}/parent/v1/${vaccinationEventID}/${studentID}/accepted`, // Sửa tại đây
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(fetchAcceptVaccineSuccess(response.data));
      toast.success(response.data.message);
    } else {
      yield put(fetchAcceptVaccineFail(response.status));
      toast.error(response.data.message);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put(
      fetchAcceptVaccineFail({
        message: error.message,
        code: error.code,
        status: error.response?.status,
      })
    );
    toast.error(errorMessage);
  }
}

function* watchFetchAcceptVaccine() {
  yield takeLatest(FETCH_ACCEPT_VACCINE, getVaccineParentAcceptSaga);
}
export default watchFetchAcceptVaccine;
