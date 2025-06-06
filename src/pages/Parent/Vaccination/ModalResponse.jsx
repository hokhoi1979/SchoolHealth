import React from "react";
import { Modal, Radio, Input, Space } from "antd";

const { TextArea } = Input;

const ModalResponse = ({
  open,
  notification,
  response,
  setResponse,
  onConfirm,
  onCancel,
}) => {
  if (!notification) return null;
  return (
    <Modal
      title={notification.title}
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="OK"
      cancelText="Cancel"
    >
      <p>{notification.description}</p>
      <Radio.Group
        onChange={(e) => setResponse({ ...response, consent: e.target.value })}
        value={response.consent}
      >
        <Space direction="vertical">
          <Radio value="yes">Confirm</Radio>
          <Radio value="no">Rejected</Radio>
        </Space>
      </Radio.Group>
      {response.consent === "no" && (
        <TextArea
          rows={4}
          placeholder="Please indicate reason for rejection"
          value={response.reason}
          onChange={(e) => setResponse({ ...response, reason: e.target.value })}
          style={{ marginTop: 16 }}
        />
      )}
    </Modal>
  );
};

export default ModalResponse;
