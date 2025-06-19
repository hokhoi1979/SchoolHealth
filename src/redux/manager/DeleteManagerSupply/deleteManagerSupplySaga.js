import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  DELETE__MANAGER__SUPPLY,
  deleteManagerSupplyFail,
  deleteManagerSupplySuccess,
} from "./deleteManagerSupplySlice";

const URL_API = import.meta.env.VITE_API_URL;

function* managerDeleteSupplySaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
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
