import React from "react";
import { Modal } from "antd";

const FormModal = ({ title, isModalVisible, handleOk, message }) => {
  return (
    <>
      <Modal
        title={title}
        visible={isModalVisible}
        onOk={handleOk}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <p>{message}</p>
      </Modal>
    </>
  );
};

export default FormModal;
