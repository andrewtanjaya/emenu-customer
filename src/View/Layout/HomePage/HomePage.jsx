import React from "react";
import { RestaurantController } from "../../../Controller/RestaurantController";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { FoodController } from "../../../Controller/FoodController";
import { useState } from "react";
import { useEffect } from "react";
import { Card, Carousel, Image, Skeleton } from "antd";
import "./HomePage.css";
import { v4 as uuid } from "uuid";
import Meta from "antd/es/card/Meta";

function HomePage() {
  const [isRecommededFoodLoad, setisRecommededFoodLoad] = useState(true);
  const [recommededFood, setRecommendedFood] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [restaurantBannerUrl, setRestaurantBannerUrl] = useState([]);
  const [restaurantVideoUrl, setRestaurantVideoUrl] = useState([]);
  const orderData = JSON.parse(sessionStorage.getItem("orderData"));
  const [restaurant, isRestaurantLoad, restaurantError, restaurantSnapshot] =
    useDocumentData(
      RestaurantController.getRestaurantProfileById(orderData.restaurantId),
      {
        idField: "id",
      }
    );

  const [food, isFoodLoad, foodError] = useCollectionData(
    FoodController.getAllFoodsByRestaurantId(orderData.restaurantId),
    {
      idField: "id",
    }
  );

  function sort(a, b) {
    return a.totalSold > b.totalSold ? 1 : -1;
  }
  useEffect(() => {
    setisRecommededFoodLoad(true);
    if (!isFoodLoad) {
      let sortedBaseTotalSales = food.sort((a, b) => b.totalSold - a.totalSold);
      let recommendedFilter = food.filter((data) => {
        return data.tags.includes("RECOMMENDED");
      });
      setRecommendedFood(recommendedFilter);
      setBestSeller(sortedBaseTotalSales);
      setisRecommededFoodLoad(false);
    }
  }, [food]);

  useEffect(() => {
    if (!isRestaurantLoad) {
      setRestaurantBannerUrl(restaurant.restaurantBanners);
      setRestaurantVideoUrl(restaurant.videoUrl);
    }
  }, [restaurant]);
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    width: "400px",
  };
  return (
    <>
      <h1>HomePage</h1>
      <div className="home-container">
        <div className="banner-container"></div>
        <div className="recommended-container"></div>
        <div className="best-seller-container"></div>
      </div>
    </>
  );
}

export default HomePage;
