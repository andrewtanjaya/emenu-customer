import { Navigate, useLocation } from "react-router-dom";
import { OrderController } from "../Controller/OrderController";

export default function Auth({ children }) {
  const location = useLocation();
  const orderData = JSON.parse(sessionStorage.getItem("orderData"));
  return orderData ? (
    children
  ) : (
    <Navigate
      to={"/invalid"}
      replace
      state={{ path: location.pathname }}
    ></Navigate>
  );
}
