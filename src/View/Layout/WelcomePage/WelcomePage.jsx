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
  const [orderTable, setOrderTable] = useState(null);
  const [orderQueue, setOrderQueue] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [orderPaymentStatus, setOrderPaymentStatus] = useState(null);

  useEffect(() => {
    if (!orderId) {
      navigate("/invalid");
    }
    OrderController.getOrderById(orderId).then((orderResp) => {
      if (orderResp) {
        RestaurantController.getRestaurantById(orderResp.restaurantId).then(
          (restoResp) => {
            if (restoResp) {
              if (orderResp.orderType !== OrderType.DINE_IN) {
                setIsDineIn(false);
                setOrderQueue(orderResp.orderQueue);
              } else {
                setIsDineIn(true);
                setOrderTable(orderResp.orderTable);
              }
              setOrderPaymentStatus(orderResp.orderPaymentStatus);
              setOrderType(orderResp.orderType);
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
      orderType: orderType,
      number: orderTable,
      restaurantLogoUrl: restaurantLogoUrl,
    };
    window.sessionStorage.setItem("orderData", JSON.stringify(orderData));
    if (orderPaymentStatus === PaymentStatus.UNPAID) {
      navigate("/home");
    } else {
      navigate("/view-bill");
    }
  }

  function handleTakeaway() {
    let orderData = {
      orderId: orderId,
      restaurantId: restaurantId,
      foodOrderType: OrderType.TAKEAWAY,
      orderType: orderType,
      number: orderType === OrderType.DINE_IN ? orderTable : orderQueue,
      restaurantLogoUrl: restaurantLogoUrl,
    };
    window.sessionStorage.setItem("orderData", JSON.stringify(orderData));
    if (orderPaymentStatus === PaymentStatus.UNPAID) {
      navigate("/home");
    } else {
      navigate("/view-bill");
    }
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
            {orderPaymentStatus === PaymentStatus.UNPAID ? (
              <>
                {isDineIn ? (
                  <>
                    <button
                      onClick={() => {
                        handleDineIn();
                      }}
                    >
                      DINE-IN
                    </button>
                    <button
                      onClick={() => {
                        handleTakeaway();
                      }}
                    >
                      TAKEAWAY
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      handleTakeaway();
                    }}
                  >
                    Menu
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    if (isDineIn) {
                      handleDineIn();
                    } else {
                      handleTakeaway();
                    }
                  }}
                >
                  View Bill
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default WelcomePage;
