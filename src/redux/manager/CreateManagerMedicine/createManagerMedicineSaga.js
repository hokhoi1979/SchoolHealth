import { call, put, takeLatest } from "redux-saga/effects";
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
import { fetchAllMedicineSupplyManagerSuccess } from "../GetAllMedicineSupplyManager/getAllMedicineSupplyManagerSlice";

const URL_API = import.meta.env.VITE_API_URL;

// Saga:
function* managerCreateMedicineSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const { name, stock, description, type, classifyID, usage, image } =
      action.payload; // payload chỉ là object thuần

    const formData = new FormData();
    formData.append("name", name);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("classifyID", classifyID);
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
        toast.success("Create Medicine Success");
      } else {
        yield put(fetchAllMedicineSupplyManagerFail(fetchData.status));
        toast.error("Create Medicine Fail");
      }
    } else {
      yield put(postMangerFailMedicine(`API ERROR: ${response.data}`));
      toast.error("Create Medicine Fail");
    }
  } catch (error) {
    console.error(error);
    yield put(postMangerFailMedicine(`API ERROR: ${error}`));
  }
}

function* watchPostManagerMedicine() {
  yield takeLatest(POST__MANAGER__MEDICINE, managerCreateMedicineSaga);
}

export default watchPostManagerMedicine;
