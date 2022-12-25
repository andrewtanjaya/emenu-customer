import { Button, Divider } from "antd";
import React from "react";
import BottomNavbar from "../../Component/BottomNavbar/BottomNavbar";
import CartItemCard from "../../Component/CartItemCard/CartItemCard";
import Navbar from "../../Component/Header/Header";
import "./CartPage.css";

function CartPage() {
  return (
    <>
      <div className="view-cart-container">
        <Navbar />
        <div className="cart-content-container">
          <div className="cart-title-container">
            <b>My Cart (3)</b>
          </div>
          <div className="cart-item-container">
            <CartItemCard
              // key={foodFiltered[i].foodId}
              // foodId={foodFiltered[i].foodId}
              foodPicture="https://cdn0-production-images-kly.akamaized.net/7zksgQW0Rf_VrjCPa_yZPadNJ2M=/1282x0:4305x3023/1200x1200/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4078801/original/082199100_1656987442-ilya-mashkov-_qxbJUr9RqI-unsplash.jpg"
              foodName="Hamburger"
              // foodPrice={`IDR. ${foodFiltered[i].foodPrice}`}
              foodPrice={"IDR. 20000"}
            ></CartItemCard>
            <CartItemCard
              // key={foodFiltered[i].foodId}
              // foodId={foodFiltered[i].foodId}
              foodPicture="https://cdn0-production-images-kly.akamaized.net/7zksgQW0Rf_VrjCPa_yZPadNJ2M=/1282x0:4305x3023/1200x1200/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4078801/original/082199100_1656987442-ilya-mashkov-_qxbJUr9RqI-unsplash.jpg"
              foodName="Hamburger"
              // foodPrice={`IDR. ${foodFiltered[i].foodPrice}`}
              foodPrice={"IDR. 20000"}
            ></CartItemCard>
            <CartItemCard
              // key={foodFiltered[i].foodId}
              // foodId={foodFiltered[i].foodId}
              foodPicture="https://cdn0-production-images-kly.akamaized.net/7zksgQW0Rf_VrjCPa_yZPadNJ2M=/1282x0:4305x3023/1200x1200/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4078801/original/082199100_1656987442-ilya-mashkov-_qxbJUr9RqI-unsplash.jpg"
              foodName="Hamburger"
              // foodPrice={`IDR. ${foodFiltered[i].foodPrice}`}
              foodPrice={"IDR. 20000"}
            ></CartItemCard>
          </div>
        </div>
        <div className="checkout-container">
          <div className="total-amount-container">
            <b>Total</b>
            <b>IDR.119000</b>
          </div>
          <div className="button-container">
            <Button type="primary">Order</Button>
          </div>
        </div>
        <BottomNavbar />
      </div>
    </>
  );
}

export default CartPage;
