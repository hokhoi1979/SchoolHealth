import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  DELETE__MANAGER__VACCINE,
  deleteManagerSucessVaccine,
  deleteMangerFailVaccine,
} from "./deleteVaccineEventSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* managerDeleteVaccineSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const { id } = action.payload;
    const response = yield call(
      axios.delete,
      `${URL_API}/manager/v1/vaccinationEvent/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("DUCC", response.data);
      yield put(deleteManagerSucessVaccine(response.data));
    } else {
      yield put(deleteMangerFailVaccine(`API ERROR: ${response.data}`));
    }
  } catch (error) {
    yield put(deleteMangerFailVaccine(`API ERROR: ${error}`));
  }
}
function* watchDeleteManagerVaccine() {
  yield takeLatest(DELETE__MANAGER__VACCINE, managerDeleteVaccineSaga);
}

export default watchDeleteManagerVaccine;
