import { all } from "redux-saga/effects";
import watchFetchLogin from "./auth/authSaga";


export default function* rootSaga() {
  yield all([

    watchFetchLogin(),

  ]);
}
