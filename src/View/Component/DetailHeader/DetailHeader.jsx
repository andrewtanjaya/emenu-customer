import { CloseOutlined, LeftOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./DetailHeader.css";

function DetailHeader() {
  const orderData = JSON.parse(sessionStorage.getItem("orderData"));

  return (
    <div className="detail-navbar-container">
      <Link to="/menu" style={{ color: "black" }}>
        <div className="customer-navbar-exit">
          <LeftOutlined />
        </div>
      </Link>

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
