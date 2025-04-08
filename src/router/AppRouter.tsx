import { Navigate, Route, Routes } from "react-router-dom";

import { AuthState } from "./enums";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";

export const AppRouter = () => {
  const authStatus: AuthState = AuthState.Authenticated;

  return (
    <Routes>
      {authStatus === AuthState.NoAuthenticated ? (
        <Route path="auth/*" element={<LoginPage />} />
      ) : (
        <Route path="*" element={<CalendarPage />} />
      )}
      <Route path="*" element={<Navigate to="auth/login" />} />
    </Routes>
  );
};
