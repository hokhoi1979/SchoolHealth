// Action Types
export const GET_AI_CHAT = "GET_AI_CHAT";
export const GET_AI_CHAT_SUCCESS = "GET_AI_CHAT_SUCCESS";
export const GET_AI_CHAT_FAIL = "GET_AI_CHAT_FAIL";
export const SET_AI_CHAT_MESSAGES = "SET_AI_CHAT_MESSAGES";

// Action Creators
export const getAiChat = (data) => ({
  type: GET_AI_CHAT,
  payload: data,
});

export const getAiChatSuccess = (data) => ({
  type: GET_AI_CHAT_SUCCESS,
  payload: data,
});

export const getAiChatFail = (error) => ({
  type: GET_AI_CHAT_FAIL,
  payload: error,
});

export const setAiChatMessages = (messages) => ({
  type: SET_AI_CHAT_MESSAGES,
  payload: messages,
});

// Reducer
const initialState = {
  getMessages: [],
  loading: false,
  error: null,
};

const getAllChatBoxAiReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AI_CHAT:
      return { ...state, loading: true, error: null };

    // case GET_AI_CHAT_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     // getMessages: action.payload,
    //     getMessages: [...action.payload, ...state.getMessages],
    //   };
    case GET_AI_CHAT_SUCCESS:
      if (action.payload.page === 1) {
        return {
          ...state,
          loading: false,
          getMessages: action.payload.messages,
        };
      } else {
        return {
          ...state,
          loading: false,
          getMessages: [...action.payload.messages, ...state.getMessages],
        };
      }

    case GET_AI_CHAT_FAIL:
      return { ...state, loading: false, error: action.payload };

    case SET_AI_CHAT_MESSAGES:
      return {
        ...state,
        getMessages: action.payload,
      };

    default:
      return state;
  }
};

export default getAllChatBoxAiReducer;
