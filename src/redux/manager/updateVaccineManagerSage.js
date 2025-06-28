import {
  actionChannel,
  call,
  put,
  select,
  takeLatest,
} from "redux-saga/effects";
import axios from "axios";
import {
  PUT__MANAGER__VACCINE,
  putManagerMedical,
  putManagerSucessMedical,
  putMangerFailMedical,
} from "./updateVaccineManagerSlice";
import { toast } from "react-toastify";
import {
  fetchVaccineManagerFail,
  fetchVaccineManagerSucess,
} from "./getVaccineManagerSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* updateVaccineManagerSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { id, ...data } = action.payload;
    const response = yield call(
      axios.put,
      `${URL_API}/manager/v1/vaccinationEvent/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("DUCC", response.data);

      yield put(putManagerSucessMedical(response.data));
      toast.success("Update Success");
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
        console.log("DUCC", fetchData.data);

        yield put(fetchVaccineManagerSucess(fetchData.data));
      } else {
        yield put(fetchVaccineManagerFail(fetchData.status));
      }
    } else {
      yield put(putMangerFailMedical(response.status));
      toast.error("Update Error");
    }
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || error.message || "Unknown error";
    yield put(putMangerFailMedical(errMsg));
    console.log(error);
  }
}

function* watchPutVaccineManager() {
  yield takeLatest(PUT__MANAGER__VACCINE, updateVaccineManagerSaga);
}

export default watchPutVaccineManager;
