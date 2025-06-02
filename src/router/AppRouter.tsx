import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";
import { AuthStatus } from "../store";
import { LoginPage } from "../auth";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === AuthStatus.Checking) return <h3>Loading...</h3>;

  return (
    <Routes>
      {status === AuthStatus.Authenticated ? (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="auth/*" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="auth/login" />} />
        </>
      )}
    </Routes>
  );
};
