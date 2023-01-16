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
import BottomNavbar from "../../Component/BottomNavbar/BottomNavbar";
import Navbar from "../../Component/Header/Header";
import MenuHorizontalCard from "../../Component/MenuHorizontalCard/MenuHorizontalCard";
import { is } from "@babel/types";
import MenuVerticalCard from "../../Component/MenuVerticalCard/MenuVerticalCard";

import BannerSlider from "../../Component/Slider/BannerSlider";
import { OrderController } from "../../../Controller/OrderController";
import { PaymentStatus } from "../../../Enum/PaymentStatus";
import { useNavigate } from "react-router-dom";
import { rupiah } from "../../../Helper/Helper";

function HomePage() {
  const navigate = useNavigate();
  const [isRecommededFoodLoad, setisRecommededFoodLoad] = useState(true);
  const [isBestSellerFoodLoad, setIsBestSellerFoodLoad] = useState(true);
  const [recommendedFood, setRecommendedFood] = useState([]);
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

  useEffect(() => {
    OrderController.getOrderById(orderData.orderId).then((orderResp) => {
      if (!orderResp || orderResp.orderPaymentStatus === PaymentStatus.PAID) {
        navigate("/invalid");
      }
    });
  }, []);

  useEffect(() => {
    setisRecommededFoodLoad(true);
    if (!isFoodLoad) {
      let sortedBasedOnTotalSales = food.sort(
        (a, b) => b.totalSold - a.totalSold
      );
      let recommendedFilter = food.filter((data) => {
        return data.tags.includes("RECOMMENDED");
      });
      setRecommendedFood(recommendedFilter);
      setBestSeller(
        sortedBasedOnTotalSales.filter((data) => {
          return data.totalSold > 0;
        })
      );
      setisRecommededFoodLoad(false);
      setIsBestSellerFoodLoad(false);
    }
  }, [food]);

  useEffect(() => {
    if (!isRestaurantLoad) {
      setRestaurantBannerUrl(restaurant.restaurantBanners);
      setRestaurantVideoUrl(restaurant.videoUrl);
    }
  }, [restaurant]);

  function showRecommendedFood() {
    let rows = [];
    for (let i = 0; i < recommendedFood.length; i++) {
      rows.push(
        <MenuVerticalCard
          key={recommendedFood[i].foodId}
          foodId={recommendedFood[i].foodId}
          foodPicture={recommendedFood[i].foodPictures[0]}
          foodName={recommendedFood[i].foodName}
          foodPrice={rupiah(recommendedFood[i].foodPrice)}
        ></MenuVerticalCard>
      );
    }
    return <>{rows}</>;
  }

  function showBestSellerFood() {
    let length = bestSeller.length;
    if (bestSeller.length > 5) {
      length = 5;
    }
    let rows = [];
    for (let i = 0; i < length; i++) {
      rows.push(
        <MenuHorizontalCard
          key={bestSeller[i].foodId}
          foodId={bestSeller[i].foodId}
          foodPicture={bestSeller[i].foodPictures[0]}
          foodName={bestSeller[i].foodName}
          foodPrice={rupiah(bestSeller[i].foodPrice)}
          totalSold={bestSeller[i].orderCount}
        ></MenuHorizontalCard>
      );
    }

    return <>{rows}</>;
  }
  return (
    <>
      <div className="home-container">
        <Navbar />
        <div className="home-page-content">
          <div className="banner-container">
            {!isRestaurantLoad && (
              <BannerSlider
                imageUrl={restaurant.restaurantBanners}
                videoUrl={restaurant.videoUrl}
              ></BannerSlider>
            )}
          </div>
          <div className="recommended-title">
            <b>Recommended</b>
            <a href="/menu?filter=recommended">See All</a>
          </div>
          <div className="recommended-container">
            {!isRecommededFoodLoad && showRecommendedFood()}
          </div>
          {bestSeller.length > 0 && (
            <>
              <div className="best-seller-title">
                <b>Best Seller</b>

                <a href="/menu?filter=best">See All</a>
              </div>
              <div className="best-seller-container">
                {!isBestSellerFoodLoad && showBestSellerFood()}
              </div>
            </>
          )}
        </div>

        <BottomNavbar />
      </div>
    </>
  );
}

export default HomePage;
