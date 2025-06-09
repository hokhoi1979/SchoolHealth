import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  POST__MANAGER__VACCINE,
  postManagerSucessVaccine,
  postMangerFailVaccine,
} from "./createVaccineManagerSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* managerVaccineSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const body = action.payload;
    const response = yield call(
      axios.post,
      `${URL_API}/manager/v1/vaccinationEvent`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("DUCC", response.data);
      yield put(postManagerSucessVaccine(response.data));
    } else {
      yield put(postMangerFailVaccine(`API ERROR: ${response.data}`));
    }
  } catch (error) {
    yield put(postMangerFailVaccine(`API ERROR: ${error}`));
  }
}
function* watchPostManagerVaccine() {
  yield takeLatest(POST__MANAGER__VACCINE, managerVaccineSaga);
}

export default watchPostManagerVaccine;
