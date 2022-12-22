import React, { useEffect } from "react";
import DetailHeader from "../../Component/DetailHeader/DetailHeader";
import { FoodController } from "../../../Controller/FoodController";
import "./DetailMenuPage.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Carousel } from "antd";
import { GroupController } from "../../../Controller/GroupController";
import GroupOptionComponent from "../../Component/GroupOptionComponent/GroupOptionComponent";

function DetailMenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [foodData, setFoodData] = useState({});
  const [groupData, setGroupData] = useState([]);
  const foodId = searchParams.get("foodId");
  const [readMore, setReadMore] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!foodId) {
      navigate("/invalid");
    }
    setIsLoading(true);
    FoodController.getFoodById(foodId).then((food) => {
      setFoodData(food);
      console.log(food);
    });
    GroupController.getAllGroupsByFoodId(foodId).then((groupSnap) => {
      let groupTemp = [];
      groupSnap.forEach((doc) => {
        groupTemp = [...groupTemp, doc.data()];
      });
      setGroupData(groupTemp);
      console.log(groupTemp);
      setIsLoading(false);
    });
  }, []);

  return !isLoading || foodData ? (
    <div className="detail-menu-page-container">
      <DetailHeader />
      <Carousel style={{ width: "100vw", maxWidth: "500px" }} dots={true}>
        {foodData && foodData.foodPictures ? (
          foodData.foodPictures.map((pictUrl) => (
            <div>
              <img
                key={pictUrl}
                className="detail-page-carousel-image"
                src={pictUrl}
                alt="Unable to load"
              />
            </div>
          ))
        ) : (
          <div>
            <img src="" alt="No Data" />
          </div>
        )}
      </Carousel>
      <div className="detail-menu-page-content-container">
        <div className="detail-menu-page-food-title">
          <p>
            <b>{foodData.foodName}</b>
          </p>
          <p>
            <b>{foodData.totalSold} Sold</b>
          </p>
        </div>
        {readMore ? (
          <div className="detail-menu-page-food-description-short">
            <p>{foodData.foodDescription}</p>
            <span onClick={() => setReadMore(false)}>Read More</span>
          </div>
        ) : (
          <div className="detail-menu-page-food-description-long">
            <p>
              {foodData.foodDescription}{" "}
              <span onClick={() => setReadMore(true)}>Read Less</span>
            </p>
          </div>
        )}

        <div className="detail-menu-page-group-container">
          {groupData ? (
            groupData.map((group) => <GroupOptionComponent group={group} />)
          ) : (
            <></>
          )}
        </div>

        <div className="detail-menu-page-food-notes">
          <p>
            <b>Notes</b>
          </p>
          <textarea
            placeholder="Notes"
            name=""
            id=""
            rows="5"
          ></textarea>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default DetailMenuPage;
