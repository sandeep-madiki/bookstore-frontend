import React, { FC } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "../modules/auth/Logout.tsx";
import PrivateRoutes from "./PrivateRoutes.tsx";
import AuthPage from "../modules/auth/AuthPage.tsx";
import App from "../App.js";

const AppRoutes: FC = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  const redirectPath =
    "/auth/?redirect=" + encodeURIComponent(window.location.pathname);
  return (
    <Router>
      <Routes>
        <Route>
          <Route path="error/*" element={<p>Error page from AppRoutes</p>} />
          <Route path="logout" element={<Logout />} />
          {isAuthenticated ? (
            <Route element={<App />}>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to={"/dashboard"} />} />
            </Route>
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to={redirectPath} />} />
            </>
          )}
        </Route>
      </Routes>
    </Router>
  );
};

export { AppRoutes };
