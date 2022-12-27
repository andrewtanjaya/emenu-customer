import React, { useEffect } from "react";
import DetailHeader from "../../Component/DetailHeader/DetailHeader";
import { FoodController } from "../../../Controller/FoodController";
import "./DetailMenuPage.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Carousel, Form, Input, InputNumber } from "antd";
import { GroupController } from "../../../Controller/GroupController";
import GroupOptionComponent from "../../Component/GroupOptionComponent/GroupOptionComponent";
import TextArea from "antd/es/input/TextArea";
import { CartItem } from "../../../Model/CartItem";
import md5 from "md5";
import { CartController } from "../../../Controller/CartController";
import { Cart } from "../../../Model/Cart";
import { OrderType } from "../../../Enum/OrderType";
import DetailMenuSlider from "../../Component/DetailMenuSlider/DetailMenuSlider";

function DetailMenuPage() {
  const orderData = JSON.parse(sessionStorage.getItem("orderData"));
  const [form] = Form.useForm();
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
    });
    GroupController.getAllGroupsByFoodId(foodId).then((groupSnap) => {
      let groupTemp = [];
      groupSnap.forEach((doc) => {
        groupTemp = [...groupTemp, doc.data()];
      });
      setGroupData(groupTemp);
      setIsLoading(false);
    });
  }, []);

  function getCartIdByOrderId() {
    let orderId = orderData.orderId.split("-");
    return "CRT-" + orderId[1];
  }

  function handleAddToCart() {
    form.submit();
  }
  const onFinish = (values) => {
    let cartId = getCartIdByOrderId();
    let optionIdsAndNotes = "";
    let sumTotalAddedValue = 0;
    let selectedGroups = [];

    if (groupData) {
      groupData.forEach((data) => {
        if (values[data.groupId]) {
          optionIdsAndNotes += values[data.groupId];

          let addedValue = 0;
          let optionName = "";
          data.options.forEach((option) => {
            if (option.optionId === values[data.groupId]) {
              addedValue = option.optionPrice;
              optionName = option.optionName;
            }
          });

          let group = {
            groupId: data.groupId,
            optionId: values[data.groupId],
            groupName: data.groupName,
            optionName: optionName,
            addedValue: Number(addedValue),
          };

          selectedGroups.push(group);
          sumTotalAddedValue += addedValue;
        }
      });
    }

    if (values.notes) {
      optionIdsAndNotes += values.notes;
    }

    let cartItemId =
      foodData.foodId +
      "-" +
      md5(optionIdsAndNotes) +
      "-" +
      orderData.foodOrderType;

    let subTotalFoodPrice = foodData.foodPrice * qty;
    let subTotalAddedValue = sumTotalAddedValue * qty;

    let cartItem = new CartItem(
      cartItemId,
      qty,
      foodData.foodName,
      foodData.foodPrice,
      foodData.foodPictures[0],
      orderData.foodOrderType,
      selectedGroups,
      values.notes ? values.notes : "",
      subTotalFoodPrice,
      subTotalAddedValue,
      subTotalFoodPrice + subTotalAddedValue
    );

    CartController.getCartById(cartId).then((resp) => {
      if (resp) {
        //if cart exist
        let cartItems = resp.cartItems;
        if (isCartItemExist(cartItems, cartItemId)) {
          //if cartItem exist
          let index = resp.cartItems.findIndex(
            (obj) => obj.cartItemId === cartItemId
          );
          resp.cartItems[index].cartItemQuantity += cartItem.cartItemQuantity;
          resp.cartItems[index].subTotalFoodPrice =
            resp.cartItems[index].cartItemQuantity *
            resp.cartItems[index].cartItemPrice;
          resp.cartItems[index].subTotalAddedValuePrice =
            resp.cartItems[index].cartItemQuantity * sumTotalAddedValue;
          resp.cartItems[index].subTotalPrice =
            resp.cartItems[index].subTotalAddedValuePrice +
            resp.cartItems[index].subTotalFoodPrice;
          resp.totalPrice = calculateTotalPrice(cartItems);
          CartController.updateCart(resp).then(() => {
            navigate("/menu");
          });
        } else {
          //if cartItem not exist
          resp.cartItems.push(Object.assign({}, cartItem));
          resp.totalPrice = calculateTotalPrice(cartItems);
          CartController.updateCart(resp).then(() => {
            navigate("/menu");
          });
        }
      } else {
        //if cart not exist
        let cart = new Cart(
          cartId,
          orderData.restaurantId,
          orderData.orderType,
          orderData.orderType === OrderType.DINE_IN ? orderData.number : null,
          orderData.orderType === OrderType.TAKEAWAY ? orderData.number : null,
          [Object.assign({}, cartItem)],
          subTotalFoodPrice + subTotalAddedValue
        );

        CartController.addCart(cart).then(() => {
          navigate("/menu");
        });
      }
    });
  };

  function isCartItemExist(cartItem, cartItemId) {
    return cartItem.some((item) => item.cartItemId === cartItemId);
  }

  function calculateTotalPrice(cartItem) {
    let totalPrice = 0;
    cartItem.forEach((item) => {
      totalPrice += item.subTotalPrice;
    });
    return totalPrice;
  }

  return !isLoading || foodData ? (
    <div className="detail-menu-page-container">
      <DetailHeader />
      <DetailMenuSlider foodPictures={foodData.foodPictures}></DetailMenuSlider>
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
        <Form className="form-atc" form={form} onFinish={onFinish}>
          <div className="detail-menu-page-group-container">
            {groupData ? (
              groupData.map((group) => (
                <GroupOptionComponent key={group.groupId} group={group} />
              ))
            ) : (
              <></>
            )}
          </div>

          <div className="detail-menu-page-food-notes">
            <p>
              <b>Notes</b>
            </p>
            <Form.Item name="notes">
              <TextArea rows={6} placeholder="Notes" />
            </Form.Item>
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
                <p>{qty}</p>
                <div
                  className="input-number-stepper-plus"
                  onClick={() => {
                    setQty((qty) => {
                      return qty + 1;
                    });
                  }}
                >
                  +
                </div>
              </div>
            </div>
            <div
              onClick={() => handleAddToCart()}
              className={
                foodData.foodAvailability
                  ? "add-to-cart-button active"
                  : "add-to-cart-button inactive"
              }
            >
              {foodData.foodAvailability ? (
                <p>
                  <b>Add To Cart - {foodData.foodPrice * qty}</b>
                </p>
              ) : (
                <p>
                  <b>Food is not available</b>
                </p>
              )}
            </div>
          </div>
        </Form>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default DetailMenuPage;
