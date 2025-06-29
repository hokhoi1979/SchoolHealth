import {
  actionChannel,
  call,
  put,
  select,
  takeLatest,
} from "redux-saga/effects";
import axios from "axios";
import {
  PATCH__MANAGER__VACCINE,
  patchManagerSucessVaccine,
  patchMangerFailVaccine,
} from "./successVaccineManagerSlice";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* patchVaccineManagerSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    console.log("TOKEN", token);
    const id = action.payload;
    const response = yield call(
      axios.patch,
      `${URL_API}/manager/v1/${id}/success`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("DUCC", response.data);
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
        toast.success("Envent Confirm Success");
      } else {
        yield put(fetchVaccineManagerFail(fetchData.status));
        toast.success("Event Confirm FAIL");
      }

      yield put(patchManagerSucessVaccine(response.data));
    } else {
      yield put(patchMangerFailVaccine(response.status));
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Đã có lỗi xảy ra";
    toast.error(`Create Vaccine Fail: ${errorMessage}`);
    yield put(patchMangerFailVaccine(errorMessage));
    console.error("Create Vaccine Error:", error);
  }
}

function* watchPatchVaccineManager() {
  yield takeLatest(PATCH__MANAGER__VACCINE, patchVaccineManagerSaga);
}

export default watchPatchVaccineManager;
