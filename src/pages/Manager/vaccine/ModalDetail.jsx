import React, { useState, useEffect } from "react";
import { Modal, Button, Input } from "antd";

const { TextArea } = Input;

export const ModalDetail = ({ open, cancel, ok, title, content }) => {
  const [editableTitle, setEditableTitle] = useState("");
  const [editableContent, setEditableContent] = useState("");

  useEffect(() => {
    setEditableTitle(title || "");
    setEditableContent(content || "");
  }, [title, content, open]);

  return (
    <Modal
      open={open}
      onCancel={cancel}
      centered
      width={600}
      mask={false}
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        border: "2px solid black", // ✅ Viền đen rõ ràng
        boxShadow: "none", // ✅ Tắt hoàn toàn bóng đổ
      }}
      footer={[
        <Button key="cancel" onClick={cancel}>
          Huỷ
        </Button>,
        <Button
          key="confirm"
          type="primary"
          onClick={() => {
            ok({ title: editableTitle, content: editableContent });
            cancel(); // đóng modal sau khi gửi
          }}
        >
          Gửi thông báo
        </Button>,
      ]}
      title={
        <div style={{ textAlign: "center" }}>
          {" "}
          {/* ✅ Canh giữa tiêu đề */}
          <Input
            value={editableTitle}
            onChange={(e) => setEditableTitle(e.target.value)}
            placeholder="Nhập tiêu đề"
            bordered={false}
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              padding: "4px 0",
              background: "transparent",
              textAlign: "center", // ✅ Canh giữa text trong input
            }}
          />
        </div>
      }
      bodyStyle={{
        padding: "16px 0 0",
      }}
    >
      <div
        style={{
          padding: "12px 16px",
          borderRadius: 8,
          backgroundColor: "#f9f9f9",
          border: "1px solid #e5e5e5",
        }}
      >
        <TextArea
          rows={6}
          value={editableContent}
          onChange={(e) => setEditableContent(e.target.value)}
          placeholder="Nhập nội dung thông báo..."
          bordered={false}
          style={{ resize: "none", background: "transparent" }}
        />
      </div>
    </Modal>
  );
};
