import React, { useEffect, useState } from "react";
import "./MenuPage.css";
import Navbar from "../../Component/Header/Header";
import SearchBar from "../../Component/SearchBar/SearchBar";
import CategoryCard from "../../Component/CategoryCard/CategoryCard";
import MenuHorizontalCard from "../../Component/MenuHorizontalCard/MenuHorizontalCard";
import BottomNavbar from "../../Component/BottomNavbar/BottomNavbar";
import { FoodController } from "../../../Controller/FoodController";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { CategoryController } from "../../../Controller/CategoryController";
import { useSearchParams } from "react-router-dom";

function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter");
  const orderData = JSON.parse(sessionStorage.getItem("orderData"));
  const [isLoad, setIsLoad] = useState(true);
  const [foodFiltered, setFoodFiltered] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [food, isFoodLoad, foodError] = useCollectionData(
    FoodController.getAllFoodsByRestaurantId(orderData.restaurantId),
    {
      idField: "id",
    }
  );

  const [category, isCategoryLoad, categoryError] = useCollectionData(
    CategoryController.getAllCategoriesByRestaurantId(orderData.restaurantId),
    {
      idField: "id",
    }
  );

  useEffect(() => {
    if (filter === "recommended") {
      setCategoryFilter("recommended");
      setActiveCategory("recommended");
    } else if (filter === "best") {
      setCategoryFilter("best");
      setActiveCategory("best");
    }
  }, []);
  useEffect(() => {
    setIsLoad(true);
    if (!isFoodLoad) {
      setFoodFiltered(
        food.filter((u) => {
          let foodName = u.foodName.toLowerCase();
          if (categoryFilter === "all") {
            return foodName.includes(keyword.toLowerCase());
          } else if (categoryFilter === "recommended") {
            return (
              u.tags.includes("RECOMMENDED") &&
              foodName.includes(keyword.toLowerCase())
            );
          } else if (categoryFilter === "best") {
            return u.totalSold != 0 && foodName.includes(keyword.toLowerCase());
          } else if (categoryFilter !== "") {
            return (
              u.categoryId.includes(categoryFilter) &&
              foodName.includes(keyword.toLowerCase())
            );
          }

          return foodName.includes(keyword.toLowerCase());
        })
      );
      setIsLoad(false);
    }
  }, [food, keyword, categoryFilter]);

  function showAllFood() {
    let rows = [];
    for (let i = 0; i < foodFiltered.length; i++) {
      rows.push(
        <MenuHorizontalCard
          key={foodFiltered[i].foodId}
          foodPicture={foodFiltered[i].foodPictures[0]}
          foodName={foodFiltered[i].foodName}
          foodPrice={`IDR. ${foodFiltered[i].foodPrice}`}
          totalSold={foodFiltered[i].totalSold}
        ></MenuHorizontalCard>
      );
    }
    return <>{rows}</>;
  }

  function showAllCategory() {
    let rows = [];
    for (let i = 0; i < category.length; i++) {
      rows.push(
        <CategoryCard
          active={activeCategory === category[i].categoryId ? true : false}
          key={category[i].categoryId}
          icon={category[i].categoryIcon}
          name={category[i].categoryName}
          id={category[i].categoryId}
          setCategoryFilter={setCategoryFilter}
          setActiveCategory={setActiveCategory}
        />
      );
    }
    return <>{rows}</>;
  }

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
        <SearchBar setKeyword={setKeyword} />

        <div className="category-list-container">
          <CategoryCard
            active={activeCategory === "all" ? true : false}
            icon="https://img.icons8.com/fluency/48/null/cake.png"
            name="All"
            setCategoryFilter={setCategoryFilter}
            setActiveCategory={setActiveCategory}
          />
          <CategoryCard
            active={activeCategory === "recommended" ? true : false}
            icon="https://img.icons8.com/fluency/48/null/cake.png"
            name="Recommended"
            setCategoryFilter={setCategoryFilter}
            setActiveCategory={setActiveCategory}
          />
          <CategoryCard
            active={activeCategory === "best" ? true : false}
            icon="https://img.icons8.com/fluency/48/null/cake.png"
            name="Best Seller"
            setCategoryFilter={setCategoryFilter}
            setActiveCategory={setActiveCategory}
          />
          {!isCategoryLoad && showAllCategory()}
        </div>

        <div className="menu-list-container">{!isLoad && showAllFood()}</div>
      </div>
      <BottomNavbar />
    </div>
  );
}

export default MenuPage;
