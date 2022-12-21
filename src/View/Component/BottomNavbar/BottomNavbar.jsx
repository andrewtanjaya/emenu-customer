import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./BottomNavbar.css";

function BottomNavbar() {
  const [activeNavbar, setActiveNavbar] = useState("");

  useEffect(() => {
    setActiveNavbar(window.location.pathname);
    console.log(window.location.pathname)
  }, []);

  return (
    <div className="bottom-navbar-container">
      <ul>
        <li onClick={() => setActiveNavbar("/home")}>
          <Link
            to="/home"
            className={
              activeNavbar === "/home"
                ? "navbar-links active-navbar"
                : "navbar-links"
            }
          >
            Home
          </Link>
        </li>
        <li onClick={() => setActiveNavbar("/menu")}>
          <Link
            to="/menu"
            className={
              activeNavbar === "/menu"
                ? "navbar-links active-navbar"
                : "navbar-links"
            }
          >
            Menu
          </Link>
        </li>
        <li onClick={() => setActiveNavbar("/cart")}>
          <Link
            to="/cart"
            className={
              activeNavbar === "/cart"
                ? "navbar-links active-navbar"
                : "navbar-links"
            }
          >
            Cart
          </Link>
        </li>
        <li onClick={() => setActiveNavbar("/bill")}>
          <Link
            to="/bill"
            className={
              activeNavbar === "/bill"
                ? "navbar-links active-navbar"
                : "navbar-links"
            }
          >
            Bill
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default BottomNavbar;
