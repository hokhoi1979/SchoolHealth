import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { fetchDetailManagerClassify } from "../GetDetallManagerClassify/getDetailManagerClassifySlice";
import {
  DELETE__MEDICINE__MANAGER,
  deleteMedicineManagerFail,
  deleteMedicineManagerSuccess,
} from "./deleteManagerMedicineSlice";
import toast from "react-hot-toast";
import {
  fetchMedicineClasstifyManagerFail,
  fetchMedicineClasstifyManagerSucess,
} from "../GetManagerMedineClassify/getManagerMedicineClassifySlice";

const URL_API = import.meta.env.VITE_API_URL;

function* deleteMedicineManagerSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
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
      toast.success("Delete Succes");
      const fetchData = yield call(
        axios.get,
        `${URL_API}/manager/v1/medicine-classify?page=1&limit=100sortBy=createdAt&order=asc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (fetchData.status === 200 || fetchData.status === 201) {
        console.log("DUCC", fetchData.data);

        yield put(fetchMedicineClasstifyManagerSucess(fetchData.data));
      } else {
        yield put(fetchMedicineClasstifyManagerFail(fetchData.status));
      }
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
