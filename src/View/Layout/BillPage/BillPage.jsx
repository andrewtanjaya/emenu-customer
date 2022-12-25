import React from "react";
import BottomNavbar from "../../Component/BottomNavbar/BottomNavbar";
import Navbar from "../../Component/Header/Header";
import "./BillPage.css";
function BillPage() {
  return (
    <div className="bill-page-container">
      <Navbar />
      <div className="bill-content">
        <div className="restaurant-info">
          <p>Restaurant Name</p>
          <p>Jalan ABC no 123 Kecamatan XYZ, 11425, Jakarta Indonesia</p>
        </div>

        <p>
          <b>TABLE 01, TR-01</b>
        </p>

        <hr />
        <p>DINE IN</p>
        <hr />

        <div className="order-item-container">
          <div className="order-item-main">
            <p>1x Grilled Cheese Salad asdadadasdasdadasdasdsa</p>
            <div className="order-item-container-right">
              <span className="order-status-indicator order-placed"></span>
              <p>IDR. 20.000</p>
            </div>
          </div>

          <div className="option-group-container">
            <p>option--1</p>
            <div className="order-item-container-right">
              <p>+ IDR. 20.000</p>
            </div>
          </div>

          <div className="option-group-container">
            <p>option--2</p>
            <div className="order-item-container-right">
              <p>+ IDR. 20.000</p>
            </div>
          </div>

          <div className="option-group-container">
            <p>option--3</p>
            <div className="order-item-container-right">
              <p>FREE</p>
            </div>
          </div>
        </div>

        <div className="order-item-container">
          <div className="order-item-main">
            <p>1x Grilled Cheese Salad asdadadasdasdadasdasdsa</p>
            <div className="order-item-container-right">
              <span className="order-status-indicator order-processed"></span>
              <p>IDR. 20.000</p>
            </div>
          </div>
        </div>

        <hr />
        <p>TAKEAWAY</p>
        <hr />

        <div className="order-item-container">
          <div className="order-item-main">
            <p>1x Grilled Cheese Salad asdadadasdasdadasdasdsa</p>
            <div className="order-item-container-right">
              <span className="order-status-indicator order-delivered"></span>
              <p>IDR. 20.000</p>
            </div>
          </div>

          <div className="option-group-container">
            <p>option--1</p>
            <div className="order-item-container-right">
              <p>+ IDR. 20.000</p>
            </div>
          </div>

          <div className="option-group-container">
            <p>option--2</p>
            <div className="order-item-container-right">
              <p>+ IDR. 20.000</p>
            </div>
          </div>

          <div className="option-group-container">
            <p>option--3</p>
            <div className="order-item-container-right">
              <p>FREE</p>
            </div>
          </div>
        </div>

        <div className="order-item-container">
          <div className="order-item-main">
            <p>1x Grilled Cheese Salad asdadadasdasdadasdasdsa</p>
            <div className="order-item-container-right">
              <span className="order-status-indicator order-placed"></span>
              <p>IDR. 20.000</p>
            </div>
          </div>
        </div>

        <hr />
        <div className="bill-page-total-container">
          <div className="detail-bill-container">
            <p>Tax</p>
            <p>IDR. 238.000</p>
          </div>
          <div className="detail-bill-container">
            <p>Service Charge</p>
            <p>IDR. 238.000</p>
          </div>
          <div className="detail-bill-container">
            <p>Subtotal</p>
            <p>IDR. 238.000</p>
          </div>
          <div className="total-bill-container">
            <p>
              <b>Total</b>
            </p>
            <p>
              <b>IDR. 238.000</b>
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

        <div className="color-info">
          <span className="order-placed"></span>
          <span>: Order Placed</span>
          <span className="order-processed"></span>
          <span>: Order Processed</span>
          <span className="order-delivered"></span>
          <span>: Order Delivered</span>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}

export default BillPage;
