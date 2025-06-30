// aiChatSaga.js

import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  POST_AI_CHAT,
  postAiChatFail,
  postAiChatSuccess,
} from "./chatBoxSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* postAiChatSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    console.log("Saga Token:", token);
    const body = action.payload;

    const response = yield call(axios.post, `${URL_API}/v1/ai_prompt`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      console.log("Full API response:", response.data);
      yield put(postAiChatSuccess({ from: "ai", text: response.data.data }));
    } else {
      yield put(postAiChatFail(`Status: ${response.status}`));
    }
  } catch (error) {
    yield put(postAiChatFail(error.message || "Unknown error"));
    console.log("AI ERROR:", error);
  }
}

function* watchAiChat() {
  yield takeLatest(POST_AI_CHAT, postAiChatSaga);
}

export default watchAiChat;
