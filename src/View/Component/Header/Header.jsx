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
      {orderData && orderData.orderType === "DINE-IN" ? (
        <div className="customer-navbar-information">
          <p>Table</p>
          {orderData.foodOrderType === "DINE-IN" ? (
            <p>Dine-in, {orderData.number}</p>
          ) : (
            <p>Takeaway, {orderData.number}</p>
          )}
        </div>
      ) : (
        <div className="customer-navbar-information">
          <p>Queue</p>
          <p>Takeaway, {orderData.number}</p>
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
