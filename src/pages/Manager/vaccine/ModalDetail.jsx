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
        border: "2px solid black",
        boxShadow: "none",
      }}
      footer={[
        <Button key="cancel" onClick={cancel}>
          Cancel
        </Button>,
        <Button
          key="confirm"
          type="primary"
          onClick={() => {
            ok({ title: editableTitle, content: editableContent });
            cancel();
          }}
        >
          Send Notification
        </Button>,
      ]}
      title={
        <div style={{ textAlign: "center" }}>
          {" "}
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
              textAlign: "center",
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
