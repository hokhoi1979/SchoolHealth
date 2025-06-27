import React, { useEffect, useRef, useState } from "react";
import { Button, Input } from "antd";
import {
  SendOutlined,
  MessageOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  postAiChat,
  postAiChatSuccess,
} from "../../../redux/AI_Chat/chatBoxSlice";
import { getAiChat } from "../../../redux/AI_Chat/getChaxBoxSlice";

const AIChatWidget = () => {
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const scrollHeightBeforeLoadRef = useRef(0);
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const { messages: postMessages, loading } = useSelector(
    (state) => state.createAiChat
  );
  const { user = {} } = useSelector((state) => state.account);
  const { getMessages, loading: loadingGet } = useSelector(
    (state) => state.getAllChatBoxAi
  );
  const dispatch = useDispatch();

  // Gộp tin nhắn đã lấy và tin nhắn mới (mới nhất ở dưới)
  const combinedMessages = [...getMessages, ...postMessages];

  // Khi mở chat, load trang đầu tiên
  useEffect(() => {
    if (visible) {
      setPage(1);
      dispatch(getAiChat({ page: 1 }));
    }
  }, [visible, dispatch]);

  // Khi có tin nhắn mới, scroll xuống cuối (trừ khi đang load thêm)
  useEffect(() => {
    if (!loadingMore) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [combinedMessages, loadingMore]);

  // Theo dõi trạng thái loading để giữ scroll vị trí sau khi load tin nhắn cũ
  const prevLoadingMore = useRef(false);
  useEffect(() => {
    if (prevLoadingMore.current && !loadingMore) {
      const el = scrollContainerRef.current;
      if (el) {
        const scrollDiff = el.scrollHeight - scrollHeightBeforeLoadRef.current;
        el.scrollTop = scrollDiff;
      }
    }
    prevLoadingMore.current = loadingMore;
  }, [loadingMore]);

  // Cuộn lên trên để load tin nhắn cũ
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el || loadingMore) return;

    if (el.scrollTop < 50 && getMessages.length >= page * 5) {
      scrollHeightBeforeLoadRef.current = el.scrollHeight;
      const nextPage = page + 1;
      setPage(nextPage);
      setLoadingMore(true);
      dispatch(getAiChat({ page: nextPage }));
    }
  };

  // Reset loadingMore khi getAiChat xong (theo flag loading của slice get)
  useEffect(() => {
    if (!loadingGet) {
      setLoadingMore(false);
    }
  }, [loadingGet]);

  // Gửi tin nhắn
  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    dispatch(postAiChatSuccess({ from: "user", text: trimmed }));
    dispatch(
      postAiChat({
        accountID: String(user?.id),
        message: trimmed,
      })
    );
    setInput("");
  };

  return (
    <>
      {/* Nút mở chat */}
      {!visible && (
        <Button
          type="primary"
          shape="circle"
          icon={<MessageOutlined />}
          size="large"
          onClick={() => setVisible(true)}
          className="fixed bottom-[180px] right-8 shadow-lg z-50"
        />
      )}

      {/* Khung chat */}
      {visible && (
        <div className="fixed ml-[100px] bottom-8 right-8 w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
            <span className="font-semibold">Chat với AI</span>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setVisible(false)}
            />
          </div>

          {/* Nội dung chat */}
          <div
            className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50"
            onScroll={handleScroll}
            ref={scrollContainerRef}
          >
            {loadingMore && (
              <div className="text-center text-gray-500 text-sm mb-2">
                Đang tải tin nhắn cũ...
              </div>
            )}

            {combinedMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm leading-relaxed break-words whitespace-pre-wrap shadow-sm ${
                    msg.from === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && !loadingMore && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg text-sm animate-pulse">
                  AI đang trả lời...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="p-2 border-t flex gap-2">
            <Input
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={handleSend}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSend}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
