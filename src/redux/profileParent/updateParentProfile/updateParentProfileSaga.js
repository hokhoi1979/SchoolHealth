import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FETCH_UPDARE_PARENT,
  fetchUpdateParentSuccess,
  fetchUpdateParentFail,
} from "./updateParentProfileSlice";
import axios from "axios";
import { toast } from "react-toastify";

const URL_API = import.meta.env.VITE_API_URL;

function* updateParentSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const response = yield call(
      axios.put,
      `${URL_API}/parent/v1/profile`,
      action.payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(fetchUpdateParentSuccess(response.data));
      toast.success(response.data.message);
    } else {
      yield put(fetchUpdateParentFail(response.status));
      toast.error(response.data.message);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put(
      fetchUpdateParentFail({
        message: errorMessage,
        code: error.code,
        status: error.response?.status,
      })
    );
    toast.error(`Error updating health record: ${errorMessage}`);
  }
}

function* watchFetchUpdateParent() {
  yield takeLatest(FETCH_UPDARE_PARENT, updateParentSaga);
}
export default watchFetchUpdateParent;
