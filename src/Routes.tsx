import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "./redux/slices/authSlice";

export const Routes = () => {
  const dispatch = useDispatch()
  return (
    <div className="d-flex justify-content-between">
      <h3>Bookstore</h3>
      <button className="btn btn-primary" onClick={() => dispatch(logout())}>
        Click Me
      </button>
    </div>
  );
};
