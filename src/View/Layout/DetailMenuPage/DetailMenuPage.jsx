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
  const [qty, setQty] = useState(1);
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
            <p>{foodData.foodDescription}</p>
            <span onClick={() => setReadMore(true)}>Read Less</span>
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
          <textarea placeholder="Notes" name="" id="" rows="6"></textarea>
        </div>

        <div className="detail-menu-page-bottom-nav">
          <div className="add-to-cart-quantity-container">
            <p>
              <b>Item Quantity</b>
            </p>
            <div className="input-number-stepper">
              <div
                className="input-number-stepper-minus"
                onClick={() => {
                  setQty((qty) => {
                    if (qty > 1) {
                      return qty - 1;
                    }
                    return qty;
                  });
                }}
              >
                -
              </div>
              <input type="number" defaultValue={1} value={qty} disabled />
              <div className="input-number-stepper-plus" onClick={() => {
                  setQty((qty) => {
                      return qty + 1;
                  });
                }}>+</div>
            </div>
          </div>
          <div
            className={
              foodData.foodAvailability
                ? "add-to-cart-button active"
                : "add-to-cart-button inactive"
            }
          >
            {foodData.foodAvailability ? (
              <p>
                <b>Add To Cart - 20.000</b>
              </p>
            ) : (
              <p>
                <b>Food is not available</b>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default DetailMenuPage;
