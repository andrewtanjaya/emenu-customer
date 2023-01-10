import { Button, Divider, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { CartController } from "../../../Controller/CartController";
import { OrderController } from "../../../Controller/OrderController";
import { OrderQueueController } from "../../../Controller/OrderQueueController";
import { IdTypes } from "../../../Enum/IdTypes";
import { OrderItemStatus } from "../../../Enum/OrderItemStatus";
import { OrderType } from "../../../Enum/OrderType";
import { PaymentStatus } from "../../../Enum/PaymentStatus";
import { Order } from "../../../Model/Order";
import { OrderItem } from "../../../Model/OrderItem";
import { OrderQueue } from "../../../Model/OrderQueue";
import BottomNavbar from "../../Component/BottomNavbar/BottomNavbar";
import CartItemCard from "../../Component/CartItemCard/CartItemCard";
import Navbar from "../../Component/Header/Header";
import { generateRandomId, rupiah } from "../../../Helper/Helper";
import "./CartPage.css";

function CartPage() {
  const navigate = useNavigate();
  const orderData = JSON.parse(sessionStorage.getItem("orderData"));
  let orderId = orderData.orderId.split("-");
  let cartId = "CRT-" + orderId[1];

  const [order, setOrder] = useState(null);

  useEffect(() => {
    OrderController.getOrderById(orderData.orderId).then((orderResp) => {
      if (!orderResp || orderResp.orderPaymentStatus === PaymentStatus.PAID) {
        navigate("/invalid");
      } else {
        setOrder(orderResp);
      }
    });
  }, []);

  const [takeawayItems, setTakeAwayItems] = useState(null);
  const [dineInItems, setdineInItems] = useState(null);
  const [cart, cartLoading, cartError, cartSnapshot] = useDocumentData(
    CartController.getDocCartById(cartId),
    {
      idField: "id",
    }
  );

  useEffect(() => {
    if (!cartLoading) {
      setdineInItems(getDineInItems());
      setTakeAwayItems(getTakeawayItems());
    }
  }, [cart]);

  function getTakeawayItems() {
    return cart.cartItems.filter((item) => {
      return item.cartItemType === OrderType.TAKEAWAY;
    });
  }
  function getDineInItems() {
    return cart.cartItems.filter((item) => {
      return item.cartItemType === OrderType.DINE_IN;
    });
  }

  function isCartNotExistOrCartItemEmpty() {
    return cart && cart.cartItems.length > 0;
  }

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    let newOrderQueueId = generateRandomId(IdTypes.ORDER_QUEUE);
    let timestamp = Date.now();
    let orderItems = cart.cartItems.map((item) => {
      let orderItem = new OrderItem(
        item.cartItemId + "-" + timestamp,
        OrderItemStatus.PLACED,
        timestamp,
        item.cartItemQuantity,
        item.cartItemName,
        item.cartItemPrice,
        item.cartItemPicUrl,
        item.cartItemType,
        item.cartItemOption,
        item.cartItemNotes,
        item.subTotalFoodPrice,
        item.subTotalAddedValuePrice,
        item.subTotalPrice
      );
      return Object.assign({}, orderItem);
    });
    order.orderItems = [...order.orderItems, ...orderItems];

    let totalOrderAmount = 0;
    order.orderItems.forEach((item) => {
      totalOrderAmount += item.subTotalPrice;
    });

    let taxAmount = Math.ceil(totalOrderAmount * (order.taxRate / 100));
    let serviceChargeAmount = Math.ceil(
      totalOrderAmount * (order.serviceChargeRate / 100)
    );

    order.taxAmount = taxAmount;
    order.serviceChargeAmount = serviceChargeAmount;
    order.totalOrderAmount = totalOrderAmount;
    order.finalTotalOrderAmount =
      totalOrderAmount + taxAmount + serviceChargeAmount;

    cart.cartItems = [];
    cart.totalPrice = 0;

    CartController.updateCart(cart).then(() => {
      OrderController.updateOrderItems(order).then(() => {
        let newOrderQueue = new OrderQueue(
          newOrderQueueId,
          orderData.orderId,
          orderData.orderType,
          orderData.orderType === OrderType.DINE_IN ? orderData.number : null,
          orderData.orderType === OrderType.TAKEAWAY ? orderData.number : null,
          orderData.restaurantId,
          timestamp
        );
        OrderQueueController.addOrderQueue(newOrderQueue).then(() => {
          setOpen(false);
        });
      });
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    !cartLoading && (
      <>
        <div className="view-cart-container">
          <Navbar />

          <div className="cart-content-container">
            {isCartNotExistOrCartItemEmpty() ? (
              <>
                <div className="cart-title-container">
                  <b>{`My Cart (${cart.cartItems.length})`}</b>
                </div>
                {dineInItems && dineInItems.length > 0 && (
                  <>
                    <div className="cart-title-container">
                      <b>Dine In</b>
                    </div>
                    <div className="cart-item-container">
                      {dineInItems.map((item) => {
                        return (
                          <CartItemCard
                            key={item.cartItemId}
                            cartItem={item}
                            cartData={cart}
                          ></CartItemCard>
                        );
                      })}
                    </div>
                  </>
                )}
                {takeawayItems && takeawayItems.length > 0 && (
                  <>
                    <div className="cart-title-container">
                      <b>Takeaway</b>
                    </div>
                    <div className="cart-item-container">
                      {takeawayItems.map((item) => {
                        return (
                          <CartItemCard
                            key={item.cartItemId}
                            cartItem={item}
                            cartData={cart}
                          ></CartItemCard>
                        );
                      })}
                    </div>
                  </>
                )}
                <div className="checkout-container">
                  <div className="total-amount-container">
                    <b>Total</b>
                    <b>{rupiah(cart.totalPrice)}</b>
                  </div>
                  <div className="button-order-container">
                    <button
                      onClick={() => {
                        showModal();
                      }}
                    >
                      Order
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2>Cart Empty</h2>
                <img
                  className="empty-logo"
                  src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                ></img>
              </>
            )}
          </div>

          <BottomNavbar />
          <Modal
            width={300}
            centered
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <button className="confirm-btn" key="submit" onClick={handleOk}>
                Confirm
              </button>,
              <button className="cancel-btn" key="back" onClick={handleCancel}>
                Cancel
              </button>,
            ]}
          >
            <div className="modal-confirm">
              <img src="https://cdn-icons-png.flaticon.com/512/6897/6897039.png"></img>
              <h2>Order Place Confirmation</h2>
              <p>Order Place Cannot be Cancel Anymore</p>
            </div>
          </Modal>
        </div>
      </>
    )
  );
}

export default CartPage;
