import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Login from "./Login.tsx";
import Registration from "./Registration.tsx";

const AuthPage = () => {
  return (
    <Routes>
      <Route
        element={
          <div className="d-flex flex-column flex-md-row auth-main-con">
            <div className="login-con w-100 w-md-50 d-flex flex-column justify-content-center align-items-center">
              <Outlet />
            </div>
          </div>
        }
      >
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration/>} />
        <Route path="forgot" element={<p>Forgot</p>} />
        <Route index element={<Login />} />
      </Route>
    </Routes>
  );
};

export default AuthPage;
