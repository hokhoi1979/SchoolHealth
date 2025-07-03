import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  POST__MANAGER__CLASSTIFY,
  postManagerFailClasstify,
  postManagerSuccessClasstify,
} from "./createManagerClassifySlice";
import {
  fetchMedicineClasstifyManagerFail,
  fetchMedicineClasstifyManagerSucess,
} from "../GetManagerMedineClassify/getManagerMedicineClassifySlice";
import toast from "react-hot-toast";

const URL_API = import.meta.env.VITE_API_URL;

function* managerClasstifySaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { body, limit, page, onSuccess } = action.payload;
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
      const createdData = response.data;
      const newId = response?.data?.data?.id;
      console.log("DUCC CLASSTIFY", response.data);
      yield put(postManagerSuccessClasstify(response.data));
      if (onSuccess && typeof onSuccess === "function") {
        yield call(onSuccess, newId); // GỌI CALLBACK VỚI ID
      }

      const { limit, page } = action.payload;
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
        console.log("DUCC", fetchData.data);

        yield put(fetchMedicineClasstifyManagerSucess(fetchData.data));
        toast.success("Create Success Classify");
      } else {
        yield put(fetchMedicineClasstifyManagerFail(fetchData.status));
        toast.error("Create Fail Classify");
      }
    } else {
      yield put(postManagerFailClasstify(`API ERROR: ${response.data}`));
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Đã có lỗi xảy ra";
    toast.error(`Create Classify Fail: ${errorMessage}`);
    yield put(postManagerFailClasstify(errorMessage));
    console.error("Create Classify Error:", error);
  }
}

function* watchPostManagerClasstify() {
  yield takeLatest(POST__MANAGER__CLASSTIFY, managerClasstifySaga);
}

export default watchPostManagerClasstify;
