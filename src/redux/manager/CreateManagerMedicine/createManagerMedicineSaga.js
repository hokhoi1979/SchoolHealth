import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  POST__MANAGER__MEDICINE,
  postManagerSucessMedicine,
  postMangerFailMedicine,
} from "./createManagerMedicineSlice";
import {
  fetchMedicineClasstifyManagerFail,
  fetchMedicineClasstifyManagerSucess,
} from "../GetManagerMedineClassify/getManagerMedicineClassifySlice";
import toast from "react-hot-toast";
import {
  fetchAllMedicineSupplyManagerFail,
  fetchAllMedicineSupplyManagerSuccess,
} from "../GetAllMedicineSupplyManager/getAllMedicineSupplyManagerSlice";

const URL_API = import.meta.env.VITE_API_URL;

// Saga:
function* managerCreateMedicineSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { name, stock, description, type, classifyID, usage, image } =
      action.payload; // payload chỉ là object thuần

    const formData = new FormData();
    formData.append("name", name);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("classifyID", classifyID?.toString?.() ?? "");
    formData.append("usage", usage);
    if (image) {
      formData.append("image", image);
    }

    const response = yield call(
      axios.post,
      `${URL_API}/manager/v1/medicine`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(postManagerSucessMedicine(response.data));
      toast.success("Create Medicine Success");
      const { page, limit = 100 } = action.payload || {};

      const fetch = yield call(
        axios.get,
        `${URL_API}/manager/v1/medicine-classify?page=${page}&limit=${limit}&sortBy=createdAt&order=asc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (fetch.status === 200 || fetch.status === 201) {
        yield put(fetchMedicineClasstifyManagerSucess(fetch.data));
      } else {
        yield put(fetchMedicineClasstifyManagerFail(fetch.status));
      }
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Đã có lỗi xảy ra";
    toast.error(`Create Medicine Fail: ${errorMessage}`);
    yield put(postMangerFailMedicine(errorMessage));
    console.error("Create Medicine Error:", error);
  }
}

function* watchPostManagerMedicine() {
  yield takeLatest(POST__MANAGER__MEDICINE, managerCreateMedicineSaga);
}

export default watchPostManagerMedicine;
