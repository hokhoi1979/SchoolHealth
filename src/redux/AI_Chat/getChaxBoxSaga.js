import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  GET_AI_CHAT,
  getAiChatFail,
  getAiChatSuccess,
} from "./getChaxBoxSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* getAiChatSaga(action) {
  try {
    const token = localStorage.getItem("accessToken");
    const { page } = action.payload;

    const response = yield call(axios.get, `${URL_API}/v1/ai_prompt`, {
      params: {
        page,
        limit: 5,
        sortBy: "createdAt",
        order: "desc",
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
      console.log("Get success", response.data);
      //   yield put(getAiChatSuccess({ from: "ai", text: response.data.data }));
      const rawData = response.data.data;

      const mappedMessages = rawData.flatMap((item) => [
        { from: "user", text: item.question },
        { from: "ai", text: item.answer },
      ]);

      // yield put(getAiChatSuccess(mappedMessages));
      // trong getAiChatSaga
      yield put(getAiChatSuccess({ messages: mappedMessages, page }));
    } else {
      yield put(getAiChatFail(`Status: ${response.status}`));
    }
  } catch (error) {
    yield put(getAiChatFail(error.message || "Unknown error"));
  }
}

function* watchGetAllChatBoxAi() {
  yield takeLatest(GET_AI_CHAT, getAiChatSaga);
}

export default watchGetAllChatBoxAi;
