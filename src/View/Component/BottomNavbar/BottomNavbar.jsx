import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./BottomNavbar.css";

function BottomNavbar() {
  const [activeNavbar, setActiveNavbar] = useState("");

  useEffect(() => {
    setActiveNavbar(window.location.pathname);
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
            <div className="navbar-icon-container">
              <img
                className="navbar-icon"
                src={
                  activeNavbar === "/home"
                    ? "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/navbar-icon%2Ficons8-home-page-30.png?alt=media&token=9825584f-aeef-4bcc-8cfb-2b40589f0d1b"
                    : "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/navbar-icon%2Ficons8-home-page-30%20(1).png?alt=media&token=f90b47c2-2ae1-4637-8368-6ef636869880"
                }
              ></img>
              <>Home</>
            </div>
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
            <div className="navbar-icon-container">
              <img
                className="navbar-icon"
                src={
                  activeNavbar === "/menu"
                    ? "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/navbar-icon%2Ficons8-menu-squared-30.png?alt=media&token=6010c69c-0623-4d62-8856-fe0a349c091f"
                    : "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/navbar-icon%2Ficons8-menu-squared-30%20(1).png?alt=media&token=dadf23c2-ebbf-49d5-8a26-c5932ba33c45"
                }
              ></img>
              <>Menu</>
            </div>
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
            <div className="navbar-icon-container">
              <img
                className="navbar-icon"
                src={
                  activeNavbar === "/cart"
                    ? "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/navbar-icon%2Ficons8-shopping-cart-30.png?alt=media&token=6310af65-cf99-4fa6-8ad2-ca94b932d0dc"
                    : "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/navbar-icon%2Ficons8-shopping-cart-30%20(1).png?alt=media&token=baeb0837-9c9c-4a60-b523-ff715d68b418"
                }
              ></img>
              <>Cart</>
            </div>
          </Link>
        </li>
        <li onClick={() => setActiveNavbar("/view-bill")}>
          <Link
            to="/view-bill"
            className={
              activeNavbar === "/view-bill"
                ? "navbar-links active-navbar"
                : "navbar-links"
            }
          >
            <div className="navbar-icon-container">
              <img
                className="navbar-icon"
                src={
                  activeNavbar === "/view-bill"
                    ? "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/navbar-icon%2Ficons8-home-page-30.png?alt=media&token=9825584f-aeef-4bcc-8cfb-2b40589f0d1b"
                    : "https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/navbar-icon%2Ficons8-home-page-30%20(1).png?alt=media&token=f90b47c2-2ae1-4637-8368-6ef636869880"
                }
              ></img>
              <>Bill</>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default BottomNavbar;
