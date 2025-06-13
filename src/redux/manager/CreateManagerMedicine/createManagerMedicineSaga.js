import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  POST__MANAGER__MEDICINE,
  postManagerSucessMedicine,
  postMangerFailMedicine,
} from "./createManagerMedicineSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* managerCreateMedicineSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const body = action.payload;
    const response = yield call(
      axios.post,
      `${URL_API}/manager/v1/medicine`,
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
      yield put(postManagerSucessMedicine(response.data));
    } else {
      yield put(postMangerFailMedicine(`API ERROR: ${response.data}`));
    }
  } catch (error) {
    yield put(postMangerFailMedicine(`API ERROR: ${error}`));
  }
}
function* watchPostManagerMedicine() {
  yield takeLatest(POST__MANAGER__MEDICINE, managerCreateMedicineSaga);
}

export default watchPostManagerMedicine;
