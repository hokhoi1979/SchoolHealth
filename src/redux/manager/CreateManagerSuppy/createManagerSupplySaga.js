import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  POST__MANAGER__SUPPLY,
  postManagerFailSupply,
  postManagerSucessSupply,
} from "./createManagerSupplySlice";
import toast from "react-hot-toast";
import {
  fetchAllMedicineSupplyManagerFail,
  fetchAllMedicineSupplyManagerSuccess,
} from "../GetAllMedicineSupplyManager/getAllMedicineSupplyManagerSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* managerCreateSupplySaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const { name, stock, description, usage, category, image } = action.payload;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("usage", usage);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    const response = yield call(
      axios.post,
      `${URL_API}/manager/v1/medicineSupply`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(postManagerSucessSupply(response.data));
      const { limit, page } = action.payload;

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
        toast.success("Create Supply Success");
      } else {
        yield put(fetchAllMedicineSupplyManagerFail(fetchData.status));
        toast.success("Create Supply Fail");
      }
    } else {
      yield put(postManagerFailSupply(`API ERROR: ${response.status}`));
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Đã có lỗi xảy ra";
    toast.error(`Create Supply Fail: ${errorMessage}`);
    yield put(postManagerFailSupply(errorMessage));
    console.error("Create Supply Error:", error);
  }
}

function* watchPostManagerSupply() {
  yield takeLatest(POST__MANAGER__SUPPLY, managerCreateSupplySaga);
}

export default watchPostManagerSupply;
