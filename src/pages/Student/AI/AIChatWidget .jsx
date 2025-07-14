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
import { motion, AnimatePresence } from "framer-motion";

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

  const combinedMessages = [...getMessages, ...postMessages];

  useEffect(() => {
    if (visible) {
      setPage(1);
      dispatch(getAiChat({ page: 1 }));

      // ✅ Delay để chờ animation xong → rồi scroll xuống
      setTimeout(() => {
        requestAnimationFrame(() => {
          const el = scrollContainerRef.current;
          if (el) el.scrollTop = el.scrollHeight;
        });
      }, 300);
    }
  }, [visible]);

  // Scroll xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (!loadingMore) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [combinedMessages, loadingMore]);

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

  useEffect(() => {
    if (!loadingGet) {
      setLoadingMore(false);
    }
  }, [loadingGet]);

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
      {!visible && (
        <Button
          type="primary"
          shape="circle"
          icon={<MessageOutlined />}
          size="large"
          onClick={() => setVisible(true)}
          className="fixed bottom-[180px] right-8 shadow-lg z-50 transition-transform duration-200 hover:scale-110 ml-[1500px]"
        />
      )}

      {/* Chatbox với animation */}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="chat-box"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={() => {
              requestAnimationFrame(() => {
                setTimeout(() => {
                  messagesEndRef.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                }, 50); // Đợi frame DOM render hoàn tất
              });
            }}
            className="fixed ml-[100px] bottom-8 right-8 w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center ">
              <span className="font-semibold">Chat with AI</span>
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => {
                  setVisible(false);
                  setTimeout(() => {
                    requestAnimationFrame(() => {
                      const el = scrollContainerRef.current;
                      if (el) el.scrollTop = el.scrollHeight;
                    });
                  }, 150);
                }}
              />
            </div>

            {/* Nội dung chat */}
            <div
              className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50 scroll-smooth"
              onScroll={handleScroll}
              ref={scrollContainerRef}
            >
              {loadingMore && (
                <div className="text-center text-gray-500 text-sm mb-2">
                  Loading old messeage
                </div>
              )}

              {combinedMessages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.from === "user" ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
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
                </motion.div>
              ))}

              {loading && !loadingMore && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    repeatType: "mirror",
                  }}
                >
                  <div className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg text-sm">
                    AI is responding
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="p-2 border-t flex gap-2">
              <Input
                placeholder="Enter Message"
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;
