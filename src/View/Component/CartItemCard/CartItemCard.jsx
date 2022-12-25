import { Button } from "antd";
import React from "react";
import "./CartItemCard.css";

function CartItemCard(props) {
  return (
    <div className="cart-item-card-container">
      <img src={props.foodPicture} alt="" />
      <div className="cart-item-card-description">
        <b>1 x Hamburger</b>
        <span className="info-container">
          <b>Spicy:&nbsp;&nbsp;</b>
          <p>sedang</p>
        </span>
        <span className="info-container">
          <b>Notes:&nbsp;&nbsp;</b>
          <p>sedangssssssssssssss</p>
        </span>
        <div className="action-button-container">
          <Button type="primary">Edit</Button>
          <Button type="default" danger>
            Delete
          </Button>
        </div>
      </div>
      <p className="cart-item-card-price">
        <b>{props.foodPrice}</b>
      </p>
    </div>
  );
}

export default CartItemCard;
