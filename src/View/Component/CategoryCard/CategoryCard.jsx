import React from "react";
import "./CategoryCard.css";

function CategoryCard(props) {
  return (
    <div
      className={
        props.active
          ? "category-card-container active-category"
          : "category-card-container"
      }
    >
      <img className="category-card-icon" src={props.icon} />
      <p>{props.name}</p>
    </div>
  );
}

export default CategoryCard;
