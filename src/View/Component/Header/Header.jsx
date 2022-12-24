import { CloseOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Navbar() {
  const orderData = JSON.parse(sessionStorage.getItem("orderData"));
  return (
    <div className="customer-navbar-container">
      <div className="customer-navbar-restaurant-logo">
        <img src={orderData.restaurantLogoUrl} />
      </div>
      {orderData && orderData.foodOrderType === "DINE-IN" ? (
        <div className="customer-navbar-information">
          <p>Table</p>
          <p>Dine-in, 01</p>
        </div>
      ) : (
        <div className="customer-navbar-information">
          <p>Queue</p>
          <p>Takeaway, 02</p>
        </div>
      )}

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

export default Navbar;
