import { CloseOutlined, LeftOutlined } from "@ant-design/icons";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DetailHeader.css";

function DetailHeader() {
  const orderData = JSON.parse(sessionStorage.getItem("orderData"));
  const navigate = useNavigate();
  return (
    <div className="detail-navbar-container">
      <div
        className="customer-navbar-exit"
        style={{ color: "black" }}
        onClick={() => {
          navigate(-1);
        }}
      >
        <LeftOutlined />
      </div>

      <Link
        to={"/welcome?orderId=" + orderData.orderId}
        style={{ color: "black" }}
      >
        <div className="customer-navbar-exit">
          <CloseOutlined />
        </div>
      </Link>
    </div>
  );
}

export default DetailHeader;
