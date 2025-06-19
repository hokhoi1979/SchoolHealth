import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  DELETE__MANAGER__MEDICINE_CLASSIFY,
  deleteManagerMedicineClassifyFail,
  deleteManagerMedicineClassifySuccess,
} from "./deleteManagerMedicineClassifySlice";
import { fetchMedicineClasstifyManager } from "../GetManagerMedineClassify/getManagerMedicineClassifySlice";

const URL_API = import.meta.env.VITE_API_URL;

function* managerDeleteMedicineClassifySaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const { id } = action.payload;

    const response = yield call(
      axios.delete,
      `${URL_API}/manager/v1/medicine-classify/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("DELETE SUCCESS:", response.data);
      yield put(deleteManagerMedicineClassifySuccess(response.data));
      yield put(fetchMedicineClasstifyManager());
    } else {
      yield put(
        deleteManagerMedicineClassifyFail(`API ERROR: ${response.data}`)
      );
    }
  } catch (error) {
    yield put(deleteManagerMedicineClassifyFail(`API ERROR: ${error}`));
    console.log(error);
  }
}

function* watchDeleteManagerMedicineClassify() {
  yield takeLatest(
    DELETE__MANAGER__MEDICINE_CLASSIFY,
    managerDeleteMedicineClassifySaga
  );
}

export default watchDeleteManagerMedicineClassify;
