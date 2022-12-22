import React from "react";
import "./MenuPage.css";
import Navbar from "../../Component/Header/Header";
import SearchBar from "../../Component/SearchBar/SearchBar";
import CategoryCard from "../../Component/CategoryCard/CategoryCard";
import MenuHorizontalCard from "../../Component/MenuHorizontalCard/MenuHorizontalCard";
import BottomNavbar from "../../Component/BottomNavbar/BottomNavbar";
function MenuPage() {
  return (
    <div className="customer-menu-page-container">
      <Navbar />
      <div className="customer-menu-page-content">
        <div className="customer-menu-page-header">
          <p>What would you</p>
          <p>
            like <b>to eat?</b>
          </p>
        </div>
        <SearchBar />

        <div className="category-list-container">
          <CategoryCard
            active={true}
            icon="https://img.icons8.com/fluency/48/null/cake.png"
            name="All"
          />
          <CategoryCard
            icon="https://img.icons8.com/fluency/48/null/cake.png"
            name="Recommended"
          />
          <CategoryCard
            icon="https://img.icons8.com/fluency/48/null/cake.png"
            name="Best Seller"
          />
          <CategoryCard
            icon="https://img.icons8.com/fluency/48/null/cake.png"
            name="Best Seller"
          />
        </div>

        <div className="menu-list-container">
          <MenuHorizontalCard
            foodPicture="https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/restaurant-logo%2FMemojiSO.png50543d2f-53e5-46f3-aa59-65526baade80?alt=media&token=d3f1c800-4b78-42b4-9325-c196d3e8d4ed"
            foodName="Grilled Cheese Salad"
            foodPrice="IDR. 20.000"
            totalSold="99"
          />
          <MenuHorizontalCard
            foodPicture="https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/restaurant-logo%2FMemojiSO.png50543d2f-53e5-46f3-aa59-65526baade80?alt=media&token=d3f1c800-4b78-42b4-9325-c196d3e8d4ed"
            foodName="Grilled Cheese Salad"
            foodPrice="IDR. 20.000"
            totalSold="99"
          />
          <MenuHorizontalCard
            foodPicture="https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/restaurant-logo%2FMemojiSO.png50543d2f-53e5-46f3-aa59-65526baade80?alt=media&token=d3f1c800-4b78-42b4-9325-c196d3e8d4ed"
            foodName="Grilled Cheese Salad"
            foodPrice="IDR. 20.000"
            totalSold="99"
          />
          <MenuHorizontalCard
            foodPicture="https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/restaurant-logo%2FMemojiSO.png50543d2f-53e5-46f3-aa59-65526baade80?alt=media&token=d3f1c800-4b78-42b4-9325-c196d3e8d4ed"
            foodName="Grilled Cheese Salad"
            foodPrice="IDR. 20.000"
            totalSold="99"
          />
          <MenuHorizontalCard
            foodPicture="https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/restaurant-logo%2FMemojiSO.png50543d2f-53e5-46f3-aa59-65526baade80?alt=media&token=d3f1c800-4b78-42b4-9325-c196d3e8d4ed"
            foodName="Grilled Cheese Salad"
            foodPrice="IDR. 20.000"
            totalSold="99"
          />
          <MenuHorizontalCard
            foodPicture="https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/restaurant-logo%2FMemojiSO.png50543d2f-53e5-46f3-aa59-65526baade80?alt=media&token=d3f1c800-4b78-42b4-9325-c196d3e8d4ed"
            foodName="Grilled Cheese Salad"
            foodPrice="IDR. 20.000"
            totalSold="99"
          />
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}

export default MenuPage;
