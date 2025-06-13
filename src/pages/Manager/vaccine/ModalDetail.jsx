import React from "react";
import { Modal, Button, Input } from "antd";

const { TextArea } = Input;

export const ModalDetail = ({ open, cancel, ok, title, content }) => {
  return (
    <Modal
      open={open}
      onCancel={cancel}
      mask={false}
      maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
      footer={[
        <Button key="cancel" onClick={cancel}>
          Cancel
        </Button>,
        <Button key="confirm" type="primary" onClick={ok}>
          Send Notification
        </Button>,
      ]}
    >
      <h2>{title}</h2>
      <TextArea defaultValue={content} rows={4} />
    </Modal>
  );
};
