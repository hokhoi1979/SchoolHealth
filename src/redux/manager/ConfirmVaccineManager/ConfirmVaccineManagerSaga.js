import {
  actionChannel,
  call,
  put,
  select,
  takeLatest,
} from "redux-saga/effects";
import axios from "axios";
import {
  PATCH__MANAGER__CONFIRM__VACCINE,
  patchManagerSucessConfirmVaccine,
  patchMangerFailConfirmVaccine,
} from "./ConfirmVaccineManagerSlice";
import { patchMangerFailVaccine } from "../successVaccineManagerSlice";
import { toast } from "react-toastify";
import {
  fetchVaccineManagerFail,
  fetchVaccineManagerSucess,
} from "../getVaccineManagerSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* patchVaccineConfirmManagerSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { id, customMailTitle, customMailBody } = action.payload;
    const response = yield call(
      axios.patch,
      `${URL_API}/manager/v1/vaccinationEvent/${id}`,
      { customMailTitle, customMailBody },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(patchManagerSucessConfirmVaccine(response.data));
      toast.success("Confirm Success");

      const fetchData = yield call(
        axios.get,
        `${URL_API}/manager/v1/vaccinationEvent`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (fetchData.status === 200 || fetchData.status === 201) {
        yield put(fetchVaccineManagerSucess(fetchData.data));
      } else {
        yield put(fetchVaccineManagerFail(fetchData.status));
      }
    } else {
      yield put(patchMangerFailConfirmVaccine(response.status));
      toast.error("Confirm Error");
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Đã có lỗi xảy ra";
    toast.error(`Confirm Vaccine Fail: ${errorMessage}`);
    yield put(patchMangerFailConfirmVaccine(errorMessage));
  }
}

function* watchPatchVaccineConfirmManager() {
  yield takeLatest(
    PATCH__MANAGER__CONFIRM__VACCINE,
    patchVaccineConfirmManagerSaga
  );
}

export default watchPatchVaccineConfirmManager;
