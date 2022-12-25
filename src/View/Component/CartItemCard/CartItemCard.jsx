import { Button } from "antd";
import React from "react";
import "./CartItemCard.css";

function CartItemCard(props) {
  return (
    <div className="cart-item-card-container">
      <img src={props.foodPicture} alt="" />
      <div className="cart-item-card-description">
        <span>1 x Hamburger</span>
        <span className="info-container">
          <span className="group-option-cart-name">Spicy &nbsp;:</span>
          <p>sedang</p>
        </span>
        <span className="info-container">
          <span className="group-option-cart-name">Notes :</span>
          <p>sedangsssssssssssssssedangsssssssssssssssedangsssssssssssssssedangsssssssssssssssedangsssssssssssssssedangsssssssssssssssedangsssssssssssssssedangsssssssssssssssedangssssssssssssss</p>
        </span>
        <div className="action-button-container">
          <button >Edit</button>
          <button >
            Delete
          </button>
        </div>
      </div>
      <div className="cart-item-card-price">
        <p><b>{props.foodPrice}</b></p>
      </div>
    </div>
  );
}

export default CartItemCard;
