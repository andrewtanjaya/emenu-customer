import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import WelcomePage from "./View/Layout/WelcomePage/WelcomePage";
import HomePage from "./View/Layout/HomePage/HomePage";
import CartPage from "./View/Layout/CartPage/CartPage";
import BillPage from "./View/Layout/BillPage/BillPage";
import MenuPage from "./View/Layout/MenuPage/MenuPage";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/bill" element={<BillPage />} />
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
