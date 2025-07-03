import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  DELETE__MANAGER__MEDICINE_CLASSIFY,
  deleteManagerMedicineClassifyFail,
  deleteManagerMedicineClassifySuccess,
} from "./deleteManagerMedicineClassifySlice";
import {
  fetchMedicineClasstifyManager,
  fetchMedicineClasstifyManagerFail,
  fetchMedicineClasstifyManagerSucess,
} from "../GetManagerMedineClassify/getManagerMedicineClassifySlice";
import {
  fetchAllMedicineSupplyManagerFail,
  fetchAllMedicineSupplyManagerSuccess,
} from "../GetAllMedicineSupplyManager/getAllMedicineSupplyManagerSlice";
import toast from "react-hot-toast";

const URL_API = import.meta.env.VITE_API_URL;

function* managerDeleteMedicineClassifySaga(action) {
  try {
    const token = yield select((state) => state.account.token);
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

      const { page, limit = 100 } = action.payload || {};

      const fetchData = yield call(
        axios.get,
        `${URL_API}/manager/v1/medicine-classify?page=${page}&limit=${limit}&sortBy=createdAt&order=asc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (fetchData.status === 200 || fetchData.status === 201) {
        console.log("DUCC", response.data);

        yield put(fetchMedicineClasstifyManagerSucess(fetchData.data));
        toast.success("Delete Success Classify");
      } else {
        yield put(fetchMedicineClasstifyManagerFail(fetchData.status));
        toast.error("Delete Error Classify");
      }
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
