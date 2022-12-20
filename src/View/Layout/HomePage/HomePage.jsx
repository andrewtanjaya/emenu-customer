import React from "react";
import { RestaurantController } from "../../../Controller/RestaurantController";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { FoodController } from "../../../Controller/FoodController";
import { useState } from "react";
import { useEffect } from "react";
import { Carousel, Image } from "antd";
import "./HomePage.css";

function HomePage() {
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
    if (!isFoodLoad) {
      let sortedBaseTotalSales = food.sort((a, b) => {
        sort(a, b);
      });
      let recommendedFilter = food.filter((data) => {
        return data.tags.includes("RECOMMEDED");
      });
      setRecommendedFood(recommendedFilter);
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
      {console.log(restaurantBannerUrl)}
      <h1>HomePage</h1>
      <div className="banner-container">
        <Carousel>
          {restaurantBannerUrl.map((url) => {
            return <Image src={url}></Image>;
          })}
          <iframe
            src="https://www.youtube.com/embed/GmyD2wdn7pE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/GmyD2wdn7pE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
          {/* <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div> */}
        </Carousel>
      </div>
    </>
  );
}

export default HomePage;
