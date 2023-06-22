import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { Input, Modal, message } from "antd";
import { addData } from "../../urls/url";
import axios from "axios";
import { validateEmail, validatePhone } from "../../urls/validator";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    addDataHandler();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addDataHandler = async () => {
    if (name === "" || email === "" || phone === "") {
      messageApi.error("Please enter all the fields");
    } else if (!validateEmail(email) && !validatePhone(phone)) {
      messageApi.error("Please enter valid email and phone"); // return;
    } else {
      try {
        const res = await axios.post(`${addData}`, { name, email, phone });
        if (res.data["success"] === true) {
          messageApi.success(res.data.message);
          setEmail("");
          setName("");
          setPhone("");
          window.location.reload();
        } else {
          messageApi.error(res.data.message);
          setEmail("");
          setName("");
          setPhone("");
        }
      } catch (error) {
        messageApi.error("Something went wrong");
        setEmail("");
        setName("");
        setPhone("");
      }
    }
  };
  return (
    <nav className="main-nav">
      {contextHolder}
      <p className="nav-title">Full Stack User App(MERN)</p>
      <div className="mobile_icons">
        <svg
          width="28"
          height="20"
          viewBox="0 0 28 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2H26"
            stroke="#054A68"
            stroke-width="3"
            stroke-linecap="round"
          />
          <path
            d="M9 10H26"
            stroke="#054A68"
            stroke-width="3"
            stroke-linecap="round"
          />
          <path
            d="M2 18H26"
            stroke="#054A68"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div className="nav-links">
        <p className="Header_links">
          <Link to="/" className="link">
            Home
          </Link>
        </p>
        <p className="Header_links">
          <p onClick={showModal}>Add User</p>
        </p>
      </div>
      <Modal
        title="Add New User"
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
    </nav>
  );
};

export default Header;
