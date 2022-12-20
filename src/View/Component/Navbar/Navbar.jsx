import { CloseOutlined } from "@ant-design/icons";
import React from "react";
import { useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const orderData = JSON.parse(sessionStorage.getItem("orderData"));

  console.log("test");
  return (
    <div className="customer-navbar-container">
      <div className="customer-navbar-restaurant-logo">
        <img src="https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/restaurant-logo%2FMemojiSO.png50543d2f-53e5-46f3-aa59-65526baade80?alt=media&token=d3f1c800-4b78-42b4-9325-c196d3e8d4ed" />
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
        <CloseOutlined />
      </div>
    </div>
  );
}

export default Navbar;
