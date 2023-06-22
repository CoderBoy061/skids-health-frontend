import React, { useState } from "react";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { Modal, message, Input } from "antd";
import axios from "axios";
import { deleteData, updateData } from "../../urls/url";
import { validateEmail, validatePhone } from "../../urls/validator";

const Card = ({ user, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleUpdate(user._id);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const warning = () => {
    Modal.warning({
      title: "Are you sure you want to delete this user?",
      content: "This action cannot be undone.",
      onOk: () => {
        handleDelete(user._id);
      },
    });
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${deleteData}/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdate = async (id) => {
    if (name === "" || email === "" || phone === "") {
      messageApi.error("Please enter all the fields");
    } else if (
      name === user.name &&
      email === user.email &&
      phone === user.phone
    ) {
      messageApi.error("Please change the fields to update");
    } else if (!validateEmail(email) && !validatePhone(phone)) {
      messageApi.error("Please enter valid email and phone");
    } else {
      try {
        await axios.patch(`${updateData}/${id}`, { name, email, phone });
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="card" key={index}>
      {contextHolder}
      <p className="name">{user.name}</p>
      <p className="email">{user.email}</p>
      <p className="phone">{user.phone}</p>

      <div className="work-icons">
        <div className="icon-div">
          <EditFilled style={{ color: "white" }} onClick={showModal} />
        </div>
        <div className="icon-div">
          <DeleteFilled style={{ color: "white" }} onClick={warning} />
        </div>
      </div>
      <Modal
        title="Edit User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="edit_box">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Card;
