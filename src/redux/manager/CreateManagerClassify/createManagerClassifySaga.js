import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  POST__MANAGER__CLASSTIFY,
  postManagerFailClasstify,
  postManagerSuccessClasstify,
} from "./createManagerClassifySlice";

const URL_API = import.meta.env.VITE_API_URL;

function* managerClasstifySaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const body = action.payload;
    const response = yield call(
      axios.post,
      `${URL_API}/manager/v1/medicine-classify`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("DUCC CLASSTIFY", response.data);
      yield put(postManagerSuccessClasstify(response.data));
      yield put(fetchMedicineClasstifyManager());
    } else {
      yield put(postManagerFailClasstify(`API ERROR: ${response.data}`));
    }
  } catch (error) {
    yield put(postManagerFailClasstify(`API ERROR: ${error}`));
  }
}

function* watchPostManagerClasstify() {
  yield takeLatest(POST__MANAGER__CLASSTIFY, managerClasstifySaga);
}

export default watchPostManagerClasstify;
