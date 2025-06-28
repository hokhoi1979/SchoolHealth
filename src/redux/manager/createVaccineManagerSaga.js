import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  POST__MANAGER__VACCINE,
  postManagerSucessVaccine,
  postMangerFailVaccine,
} from "./createVaccineManagerSlice";
import {
  fetchVaccineManagerFail,
  fetchVaccineManagerSucess,
} from "./getVaccineManagerSlice";
import { toast } from "react-toastify";

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
        toast.success("Create Vaccine Success");
      } else {
        yield put(fetchVaccineManagerFail(fetchData.status));
        toast.error("Create Vaccine Fail ");
      }
    } else {
      yield put(postMangerFailVaccine(`API ERROR: ${response.data}`));
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Đã có lỗi xảy ra";
    toast.error(`Create Vaccine Fail: ${errorMessage}`);
    yield put(postMangerFailVaccine(errorMessage));
    console.error("Create Vaccine Error:", error);
  }
}
function* watchPostManagerVaccine() {
  yield takeLatest(POST__MANAGER__VACCINE, managerVaccineSaga);
}

export default watchPostManagerVaccine;
