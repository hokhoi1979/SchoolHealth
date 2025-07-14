import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  POST__REGISTER,
  postRegisterFail,
  postRegisterSuccess,
} from "./registerSlice";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

function* registerSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_URL}/v1/auth/register`,
      action.payload
    );
    if (response.status === 200 || response.status === 201) {
      yield put(postRegisterSuccess(response.data));
      toast.success("Register successful!");
    } else {
      yield put(postRegisterFail(response.status));
    }
  } catch (error) {
    yield put(postRegisterFail(error));
  }
}

function* watchRegister() {
  yield takeLatest(POST__REGISTER, registerSaga);
}

export default watchRegister;
