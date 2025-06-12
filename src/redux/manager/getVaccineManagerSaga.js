import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import getvaccineManagerReducer, {
  FETCH__VACCINE__MANAGER,
  fetchVaccineManagerFail,
  fetchVaccineManagerSucess,
} from "./getVaccineManagerSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* vaccineManagerSaga() {
  try {
    const token = localStorage.getItem("accessToken");
    const response = yield call(
      axios.get,
      `${URL_API}/manager/v1/vaccinationEvent`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("DUCC", response.data);

      yield put(fetchVaccineManagerSucess(response.data));
    } else {
      yield put(fetchVaccineManagerFail(response.status));
    }
  } catch (error) {
    yield put(fetchVaccineManagerFail(error));
  }
}

function* watchFetchVaccineManager() {
  yield takeLatest(FETCH__VACCINE__MANAGER, vaccineManagerSaga);
}

export default watchFetchVaccineManager;
