import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PUT__MANAGER__SUPPLY,
  putManagerFailSupply,
  putManagerSuccessSupply,
  putManagerSupply,
} from "./updateManagerSupplySlice";
import toast from "react-hot-toast";
import {
  fetchAllMedicineSupplyManagerFail,
  fetchAllMedicineSupplyManagerSuccess,
} from "../GetAllMedicineSupplyManager/getAllMedicineSupplyManagerSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
function* updateManagerSupplySaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const { id, ...data } = action.payload;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("usage", data.usage);
    formData.append("category", data.category);
    formData.append("stock", data.stock);

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    const response = yield call(
      axios.patch,
      `${URL_API}/manager/v1/medicineSupply/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(putManagerSuccessSupply(response.data));

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
        toast.success("Update Success Supply");
      } else {
        yield put(fetchAllMedicineSupplyManagerFail(fetchData.status));
        toast.error("Update Success Supply");
      }
    } else {
      yield put(putManagerFailSupply(response.status));
    }
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || error.message || "Unknown error";
    yield put(putManagerFailSupply(errMsg));
    console.log(error);
  }
}

function* watchPutManagerSupply() {
  yield takeLatest(PUT__MANAGER__SUPPLY, updateManagerSupplySaga);
}

export default watchPutManagerSupply;
