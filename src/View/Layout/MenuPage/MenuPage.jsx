import React from "react";
import "./MenuPage.css"
import Navbar from "../../Component/Navbar/Navbar";
import SearchBar from "../../Component/SearchBar/SearchBar";
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
        <SearchBar/>
      </div>
    </div>
  );
}

export default MenuPage;
