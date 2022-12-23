import React from "react";
import "./MenuVerticalCard.css";

function MenuVerticalCard(props) {
  return (
    <div className="menu-vertical-card-container">
      <img src={props.foodPicture} alt="" />
      <div className="menu-card-description">
        <p>{props.foodName}</p>
        <b>{props.foodPrice}</b>
      </div>
      {/* <p className="menu-card-price">
        <b>{props.foodPrice}</b>
      </p> */}
    </div>
  );
}

export default MenuVerticalCard;
