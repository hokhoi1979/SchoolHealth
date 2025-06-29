import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  DELETE__MANAGER__SUPPLY,
  deleteManagerSupplyFail,
  deleteManagerSupplySuccess,
} from "./deleteManagerSupplySlice";
import {
  fetchAllMedicineSupplyManagerFail,
  fetchAllMedicineSupplyManagerSuccess,
} from "../GetAllMedicineSupplyManager/getAllMedicineSupplyManagerSlice";
import toast from "react-hot-toast";

const URL_API = import.meta.env.VITE_API_URL;

function* managerDeleteSupplySaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { id } = action.payload;

    const response = yield call(
      axios.delete,
      `${URL_API}/manager/v1/medicineSupply/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("DELETE SUCCESS:", response.data);
      yield put(deleteManagerSupplySuccess(response.data));

      const { page, limit } = action.payload;
      const fetchData = yield call(
        axios.get,
        `${URL_API}/manager/v1/medicineSupply?page=${page}&limit=${limit}&sortBy=createdAt&order=asc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (fetchData.status === 200 || fetchData.status === 201) {
        yield put(fetchAllMedicineSupplyManagerSuccess(fetchData.data));
        toast.success("Delete Success Supply");
      } else {
        yield put(fetchAllMedicineSupplyManagerFail(fetchData.status));
        toast.error("Delete Success Supply");
      }
    } else {
      yield put(deleteManagerSupplyFail(`API ERROR: ${response.data}`));
    }
  } catch (error) {
    yield put(deleteManagerSupplyFail(`API ERROR: ${error}`));
    console.log(error);
  }
}

function* watchDeleteManagerSupply() {
  yield takeLatest(DELETE__MANAGER__SUPPLY, managerDeleteSupplySaga);
}

export default watchDeleteManagerSupply;
