import React from "react";
import { Link } from "react-router-dom";
import "./MenuHorizontalCard.css";

function MenuHorizontalCard(props) {
  return (
    <Link className="menu-horizontal-card-link" to={"/detail?foodId=" + props.foodId}>
      <div className="menu-horizontal-card-container">
        <img src={props.foodPicture} alt="" />
        <div className="menu-card-description">
          <p>{props.foodName}</p>
          <p>{props.totalSold} Sold</p>
        </div>
        <p className="menu-card-price">
          <b>{props.foodPrice}</b>
        </p>
      </div>
    </Link>
  );
}

export default MenuHorizontalCard;
