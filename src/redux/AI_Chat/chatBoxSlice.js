// aiChatSlice.js

export const POST_AI_CHAT = "POST_AI_CHAT";
export const POST_AI_CHAT_SUCCESS = "POST_AI_CHAT_SUCCESS";
export const POST_AI_CHAT_FAIL = "POST_AI_CHAT_FAIL";
export const SET_AI_CHAT_MESSAGES = "SET_AI_CHAT_MESSAGES";

export const postAiChat = (data) => ({
  type: POST_AI_CHAT,
  payload: data,
});

export const postAiChatSuccess = (data) => ({
  type: POST_AI_CHAT_SUCCESS,
  payload: data,
});

export const postAiChatFail = (error) => ({
  type: POST_AI_CHAT_FAIL,
  payload: error,
});

export const setAiChatMessages = (messages) => ({
  type: SET_AI_CHAT_MESSAGES,
  payload: messages,
});
const initialState = {
  messages: [],
  loading: false,
  error: null,
};

const aiChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_AI_CHAT:
      return { ...state, loading: true, error: null };

    case POST_AI_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: [...state.messages, action.payload],
      };

    case POST_AI_CHAT_FAIL:
      return { ...state, loading: false, error: action.payload };

    case SET_AI_CHAT_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
};

export default aiChatReducer;
