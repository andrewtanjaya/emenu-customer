import React from "react";
import "./CategoryCard.css";

function CategoryCard(props) {
  return (
    <div
      onClick={(e) => {
        if (props.name === "All") {
          props.setCategoryFilter("all");
          props.setActiveCategory("all");
        } else if (props.name === "Recommended") {
          props.setCategoryFilter("recommended");
          props.setActiveCategory("recommended");
        } else if (props.name === "Best Seller") {
          props.setCategoryFilter("best");
          props.setActiveCategory("best");
        } else {
          props.setCategoryFilter(props.id);
          props.setActiveCategory(props.id);
        }
      }}
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
