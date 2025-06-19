import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { fetchDetailManagerClassify } from "../GetDetallManagerClassify/getDetailManagerClassifySlice";
import {
  DELETE__MEDICINE__MANAGER,
  deleteMedicineManagerFail,
  deleteMedicineManagerSuccess,
} from "./deleteManagerMedicineSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* deleteMedicineManagerSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const { id } = action.payload;

    const response = yield call(
      axios.delete,
      `${URL_API}/manager/v1/medicine/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("DELETE SUCCESS:", response.data);
      yield put(deleteMedicineManagerSuccess(response.data));
      yield put(fetchDetailManagerClassify());
    } else {
      yield put(deleteMedicineManagerFail(`API ERROR: ${response.statusText}`));
    }
  } catch (error) {
    yield put(deleteMedicineManagerFail(`API ERROR: ${error.message}`));
    console.error(error);
  }
}

function* watchDeleteMedicineManager() {
  yield takeLatest(DELETE__MEDICINE__MANAGER, deleteMedicineManagerSaga);
}

export default watchDeleteMedicineManager;
