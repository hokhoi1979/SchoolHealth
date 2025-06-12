import { Modal } from "antd";

export const ModalDetail = ({ open, canncel, ok }) => {
  return (
    <>
      <Modal open={open} onCancel={canncel}></Modal>
    </>
  );
};
