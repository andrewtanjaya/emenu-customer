import React, { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { OrderController } from "../../../Controller/OrderController";
import { RestaurantController } from "../../../Controller/RestaurantController";
import { OrderItemStatus } from "../../../Enum/OrderItemStatus";
import { OrderType } from "../../../Enum/OrderType";
import { PaymentStatus } from "../../../Enum/PaymentStatus";
import { rupiah } from "../../../Helper/Helper";
import BottomNavbar from "../../Component/BottomNavbar/BottomNavbar";
import Navbar from "../../Component/Header/Header";
import "./BillPage.css";
function BillPage() {
  const navigate = useNavigate();
  const orderData = JSON.parse(sessionStorage.getItem("orderData"));

  const [restaurant, setRestaurant] = useState(null);

  const [takeawayItems, setTakeAwayItems] = useState(null);
  const [dineInItems, setdineInItems] = useState(null);
  const [order, orderLoading, orderError, orderSnapshot] = useDocumentData(
    OrderController.getDocOrderById(orderData.orderId),
    {
      idField: "id",
    }
  );

  useEffect(() => {
    RestaurantController.getRestaurantById(orderData.restaurantId).then(
      (restoResp) => {
        if (restoResp) {
          setRestaurant(restoResp);
        } else {
          navigate("/invalid");
        }
      }
    );
  }, []);

  useEffect(() => {
    if (!orderLoading) {
      // if (!orderLoading) {
      //   if (order.orderPaymentStatus === PaymentStatus.PAID) {
      //     console.log(order.orderPaymentStatus);
      //     navigate("/invalid");
      //   }
      // }
      setdineInItems(getDineInItems());
      setTakeAwayItems(getTakeawayItems());
    }
  }, [order]);

  function getTakeawayItems() {
    return order.orderItems.filter((item) => {
      return item.orderItemType === OrderType.TAKEAWAY;
    });
  }
  function getDineInItems() {
    return order.orderItems.filter((item) => {
      return item.orderItemType === OrderType.DINE_IN;
    });
  }

  function isOrderItemsEmpty() {
    return order.orderItems.length > 0;
  }

  function isOrderItemOptionEmpty(item) {
    return item.orderItemOption.length > 0;
  }

  function getItemStatus(status) {
    if (status === OrderItemStatus.PLACED) {
      return "order-status-indicator order-placed";
    } else if (status === OrderItemStatus.PROCESSED) {
      return "order-status-indicator order-processed";
    } else if (status === OrderItemStatus.READY) {
      return "order-status-indicator order-ready";
    } else if (status === OrderItemStatus.DELIVERED) {
      return "order-status-indicator order-delivered";
    }
  }
  return (
    !orderLoading && (
      <div className="bill-page-container">
        <Navbar />

        <div className="bill-content">
          <div className="restaurant-info">
            {restaurant && (
              <>
                <p>{restaurant.restaurantName}</p>
                <p>
                  {restaurant.restaurantAddress.street},{" "}
                  {restaurant.restaurantAddress.district},{" "}
                  {restaurant.restaurantAddress.city},{" "}
                  {restaurant.restaurantAddress.postalCode},{" "}
                  {restaurant.restaurantAddress.province}{" "}
                  {restaurant.restaurantAddress.country}
                </p>
              </>
            )}
          </div>

          <p>
            {orderData.orderType === OrderType.DINE_IN ? (
              <b>
                TABLE {orderData.number}, {orderData.orderId}
              </b>
            ) : (
              <b>
                QUEUE {orderData.number}, {orderData.orderId}
              </b>
            )}
          </p>

          {isOrderItemsEmpty() ? (
            <>
              {dineInItems && dineInItems.length > 0 && (
                <>
                  {" "}
                  <hr />
                  <p>DINE IN</p>
                  <hr />
                  {dineInItems.map((item) => {
                    return (
                      <div className="order-item-container">
                        <div className="order-item-main">
                          <p>
                            {item.orderItemQuantity}x {item.orderItemName}
                          </p>
                          <div className="order-item-container-right">
                            <span
                              className={getItemStatus(item.orderItemStatus)}
                            ></span>
                            <p>{rupiah(item.subTotalFoodPrice)}</p>
                          </div>
                        </div>
                        {isOrderItemOptionEmpty(item) &&
                          item.orderItemOption.map((opt) => {
                            return (
                              <div className="option-group-container">
                                <p>{opt.optionName}</p>
                                <div className="order-item-container-right">
                                  <p>
                                    {opt.addedValue === 0
                                      ? "FREE"
                                      : `+ ${rupiah(
                                          opt.addedValue *
                                            item.orderItemQuantity
                                        )}`}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    );
                  })}
                </>
              )}
              {takeawayItems && takeawayItems.length > 0 && (
                <>
                  {" "}
                  <hr />
                  <p>TAKEAWAY</p>
                  <hr />
                  {takeawayItems.map((item) => {
                    return (
                      <div className="order-item-container">
                        <div className="order-item-main">
                          <p>
                            {item.orderItemQuantity}x {item.orderItemName}
                          </p>
                          <div className="order-item-container-right">
                            <span
                              className={getItemStatus(item.orderItemStatus)}
                            ></span>
                            <p>{rupiah(item.subTotalFoodPrice)}</p>
                          </div>
                        </div>
                        {isOrderItemOptionEmpty(item) &&
                          item.orderItemOption.map((opt) => {
                            return (
                              <div className="option-group-container">
                                <p>{opt.optionName}</p>
                                <div className="order-item-container-right">
                                  <p>
                                    {opt.addedValue === 0
                                      ? "FREE"
                                      : `+ ${rupiah(
                                          opt.addedValue *
                                            item.orderItemQuantity
                                        )}`}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    );
                  })}
                </>
              )}

              <hr />
              <div className="bill-page-total-container">
                <div className="detail-bill-container">
                  <p>Tax</p>
                  <p>{rupiah(order.taxAmount)}</p>
                </div>
                <div className="detail-bill-container">
                  <p>Service Charge</p>
                  <p>{rupiah(order.serviceChargeAmount)}</p>
                </div>
                <div className="detail-bill-container">
                  <p>Subtotal</p>
                  <p>{rupiah(order.totalOrderAmount)}</p>
                </div>
                <div className="total-bill-container">
                  <p>
                    <b>Total</b>
                  </p>
                  <p>
                    <b>{rupiah(order.finalTotalOrderAmount)}</b>
                  </p>
                </div>
              </div>
              <div className="bill-page-nb-container">
                <hr />
                <p>
                  <i>NB: SILAHKAN MELAKUKAN PEMBAYARAN DI KASIR</i>
                </p>
                <hr />
              </div>
            </>
          ) : (
            <>
              <h3>No Order Yet</h3>
            </>
          )}
          <div className="color-info">
            <span className="order-placed"></span>
            <span>: Order Placed</span>
            <span className="order-processed"></span>
            <span>: Order Processed</span>
            <span className="order-ready"></span>
            <span>: Order Ready</span>
            <span className="order-delivered"></span>
            <span>: Order Delivered</span>
          </div>
        </div>
        {order.orderPaymentStatus === PaymentStatus.UNPAID && <BottomNavbar />}
      </div>
    )
  );
}

export default BillPage;
