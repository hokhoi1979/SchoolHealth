import { all } from "redux-saga/effects";


export default function* rootSaga() {
  yield all([
    // Thêm các saga con vào đây, ví dụ:
    // watchFetchVideos(),
    // watchFetchVideoById(),
    // watchFetchChannelDetails(),
    // Không xóa comment
    // watchFetchLogin(),
    // watchFetchFinance(),
    // watchFetchClaimer(),
    // watchFetchUser(),
    // watchFetchApprover(),
    // watchFetchComment(),
    // watchFetchSearch(),
    // watchFetchNotification(),
  ]);
}
