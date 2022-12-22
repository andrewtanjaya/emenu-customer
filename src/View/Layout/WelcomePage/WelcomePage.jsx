import { Avatar, Button } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OrderController } from "../../../Controller/OrderController";
import { RestaurantController } from "../../../Controller/RestaurantController";
import { OrderType } from "../../../Enum/OrderType";
import { PaymentStatus } from "../../../Enum/PaymentStatus";
import "./WelcomePage.css";

function WelcomePage() {
  const navigate = useNavigate();
  const [isLoad, setIsLoad] = useState(true);
  const [isDineIn, setIsDineIn] = useState(false);
  const [restaurantLogoUrl, setRestaurantLogoUrl] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [restaurantId, setRestaurantId] = useState("");
  const [restaurantName, setRestaurantName] = useState("");

  useEffect(() => {
    if (!orderId) {
      navigate("/invalid");
    }
    OrderController.getOrderById(orderId).then((orderResp) => {
      if (orderResp && orderResp.orderPaymentStatus === PaymentStatus.UNPAID) {
        RestaurantController.getRestaurantById(orderResp.restaurantId).then(
          (restoResp) => {
            if (restoResp) {
              console.log(restoResp);
              if (orderResp.orderType !== OrderType.DINE_IN) {
                setIsDineIn(false);
              } else {
                setIsDineIn(true);
              }
              setRestaurantName(restoResp.restaurantName);
              setRestaurantLogoUrl(restoResp.restaurantLogoPicture);
              setRestaurantId(orderResp.restaurantId);
              setIsLoad(false);
            } else {
              navigate("/invalid");
            }
          }
        );
      } else {
        navigate("/invalid");
      }
    });
  }, []);

  function handleDineIn() {
    let orderData = {
      orderId: orderId,
      restaurantId: restaurantId,
      foodOrderType: OrderType.DINE_IN,
      restaurantLogoUrl: restaurantLogoUrl,
    };
    window.sessionStorage.setItem("orderData", JSON.stringify(orderData));
    navigate("/home");
  }

  function handleTakeaway() {
    let orderData = {
      orderId: orderId,
      restaurantId: restaurantId,
      foodOrderType: OrderType.TAKEAWAY,
      restaurantLogoUrl: restaurantLogoUrl,
    };
    window.sessionStorage.setItem("orderData", JSON.stringify(orderData));
    navigate("/home");
  }
  return (
    <>
      {!isLoad && (
        <div className="welcome-page-container">
          <div className="image-container">
            <img src={restaurantLogoUrl}></img>
            {/* <Avatar
              size={{
                xs: 24,
                sm: 32,
                md: 40,
                lg: 64,
                xl: 80,
                xxl: 100,
              }}
              src={restaurantLogoUrl}
            /> */}
          </div>
          <div className="button-container">
            <h2>{restaurantName}</h2>
            {isDineIn ? (
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    handleDineIn();
                  }}
                >
                  DINE-IN
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    handleTakeaway();
                  }}
                >
                  TAKEAWAY
                </Button>
              </>
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  handleTakeaway();
                }}
              >
                Menu
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default WelcomePage;
