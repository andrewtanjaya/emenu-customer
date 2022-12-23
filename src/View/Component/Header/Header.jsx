import { CloseOutlined } from "@ant-design/icons";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./Header.css";

function Navbar() {
  const orderData = JSON.parse(sessionStorage.getItem("orderData"));
  const navigate = useNavigate();
  return (
    <div className="customer-navbar-container">
      <div className="customer-navbar-restaurant-logo">
        <img src={orderData.restaurantLogoUrl} />
      </div>
      {/* <div className="customer-navbar-information">
      <p>Table</p> <p>Dine-in, 01</p> */}
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

      <div className="customer-navbar-exit">
        <CloseOutlined
          onClick={() => {
            navigate(`/welcome?orderId=${orderData.orderId}`);
          }}
        />
      </div>
    </div>
  );
}

export default Navbar;
