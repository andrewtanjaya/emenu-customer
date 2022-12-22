import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import WelcomePage from "./View/Layout/WelcomePage/WelcomePage";
import HomePage from "./View/Layout/HomePage/HomePage";
import CartPage from "./View/Layout/CartPage/CartPage";
import BillPage from "./View/Layout/BillPage/BillPage";
import MenuPage from "./View/Layout/MenuPage/MenuPage";
import Auth from "./Utils/Auth";
import DetailMenuPage from "./View/Layout/DetailMenuPage/DetailMenuPage";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route
          path="/home"
          element={
            <Auth>
              <HomePage />
            </Auth>
          }
        />
        <Route
          path="/menu"
          element={
            <Auth>
              <MenuPage />
            </Auth>
          }
        />
        <Route
          path="/detail"
          element={
            <Auth>
              <DetailMenuPage />
            </Auth>
          }
        />
        <Route
          path="/cart"
          element={
            <Auth>
              <CartPage />
            </Auth>
          }
        />
        <Route
          path="/view-bill"
          element={
            <Auth>
              <BillPage />
            </Auth>
          }
        />
        <Route
          path="*"
          element={
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={
                <Button
                  type="primary"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Back Home
                </Button>
              }
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
