import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PATCH__MANAGER__END__MEDICAL__CHECKUP,
  patchManagerFailEndMedicalCheckup,
  patchManagerSuccessEndMedicalCheckup,
} from "./endEventMedicalCheckUpManagerSlice";
import { toast } from "react-toastify";
import {
  fetchCheckupManagerFail,
  fetchCheckupManagerSuccess,
} from "../GetAllCheckUpManager/getAllCheckUpManagerSlice";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function* patchEndMedicalCheckupManagerSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const id = action.payload;

    const response = yield call(
      axios.patch,
      `${URL_API}/manager/v1/check-up/${id}/success`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(patchManagerSuccessEndMedicalCheckup(response.data));
      toast.success("End Event Success");

      const fetch = yield call(axios.get, `${URL_API}/manager/v1/check-up`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (fetch.status === 200 || fetch.status === 201) {
        yield put(fetchCheckupManagerSuccess(fetch.data));
      } else {
        yield put(fetchCheckupManagerFail(fetch.status));
      }
    } else {
      yield put(patchManagerFailEndMedicalCheckup(response.status));
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Đã có lỗi xảy ra";
    toast.error(`End MedicalCheckup Fail: ${errorMessage}`);
    yield put(patchManagerFailEndMedicalCheckup(errorMessage));
    console.error("Create Vaccine Error:", error);
  }
}

function* watchPatchEndMedicalCheckupManager() {
  yield takeLatest(
    PATCH__MANAGER__END__MEDICAL__CHECKUP,
    patchEndMedicalCheckupManagerSaga
  );
}

export default watchPatchEndMedicalCheckupManager;
