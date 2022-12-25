import React from "react";
import { Link } from "react-router-dom";
import "./MenuVerticalCard.css";

function MenuVerticalCard(props) {
  return (
    <Link
      className="menu-vertical-card-link"
      to={"/detail?foodId=" + props.foodId}
    >
      <div className="menu-vertical-card-container">
        <img src={props.foodPicture} alt="" />
        <div className="menu-vertical-card-description">
          <p>{props.foodName}</p>
          <b>{props.foodPrice}</b>
        </div>
      </div>
    </Link>
  );
}

export default MenuVerticalCard;
