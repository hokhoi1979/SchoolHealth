import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  POST__MANAGER__SUPPLY,
  postManagerFailSupply,
  postManagerSucessSupply,
} from "./createManagerSupplySlice";

const URL_API = import.meta.env.VITE_API_URL;

function* managerCreateSupplySaga(action) {
  try {
    const token = localStorage.getItem("accessToken");

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
    } else {
      yield put(postManagerFailSupply(`API ERROR: ${response.status}`));
    }
  } catch (error) {
    console.error(error);
    yield put(postManagerFailSupply(`API ERROR: ${error.message}`));
  }
}

function* watchPostManagerSupply() {
  yield takeLatest(POST__MANAGER__SUPPLY, managerCreateSupplySaga);
}

export default watchPostManagerSupply;
