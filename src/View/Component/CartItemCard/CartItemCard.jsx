import { Button } from "antd";
import React from "react";
import { CartController } from "../../../Controller/CartController";
import "./CartItemCard.css";

function CartItemCard(props) {
  function handleDelete(cartItemId) {
    let index = props.cartData.cartItems.findIndex(
      (obj) => obj.cartItemId === cartItemId
    );
    if (index >= 0) {
      props.cartData.cartItems.splice(index, 1);
    }

    CartController.updateCart(props.cartData);
  }
  return (
    <div className="cart-item-card-container">
      <img src={props.foodPicture} alt="" />
      <div className="cart-item-card-description">
        <span>
          {props.qty} x {props.foodName}
        </span>
        {props.option &&
          props.option.map((opt) => {
            return (
              <span className="info-container" key={opt.groupId}>
                <span className="group-option-cart-name">
                  {opt.groupName}&nbsp;:
                </span>
                <p>&nbsp;{opt.optionName}</p>
              </span>
            );
          })}

        {props.notes && (
          <span className="info-container">
            <span className="group-option-cart-name">Notes :</span>
            <p>{props.notes}</p>
          </span>
        )}
        <div className="action-button-container">
          <button>Edit</button>
          <button onClick={() => handleDelete(props.cartItemId)}>Delete</button>
        </div>
      </div>
      <div className="cart-item-card-price">
        <p>
          <b>{`IDR. ${props.foodPrice}`}</b>
        </p>
      </div>
    </div>
  );
}

export default CartItemCard;
