import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  clearErrorMessage,
  AppDispatch,
  onChecking,
  RootState,
  onLogout,
  onLogin,
} from "../store";
import { calendarApi } from "../api";

type StartLogin = {
  email: string;
  password: string;
};

type StartRegister = {
  name: string;
  email: string;
  password: string;
};

type AuthResponse = {
  uid: string;
  name: string;
  email: string;
  token: string;
};

export const useAuthStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const startLogin = async ({ email, password }: StartLogin) => {
    dispatch(onChecking());

    try {
      const {
        data: { token, ...user },
      } = await calendarApi.post<AuthResponse>("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());

      dispatch(onLogin(user));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message ?? null;
        dispatch(onLogout({ message }));

        setTimeout(() => {
          dispatch(clearErrorMessage());
        }, 10);
        return;
      }

      if (error instanceof Error) {
        dispatch(onLogout({ message: error.message ?? null }));
        setTimeout(() => {
          dispatch(clearErrorMessage());
        }, 10);
      }
    }
  };

  const startRegister = async ({ name, email, password }: StartRegister) => {
    dispatch(onChecking());

    try {
      const {
        data: { token, ...user },
      } = await calendarApi.post<AuthResponse>("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());

      dispatch(onLogin(user));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        const message = data.message
          ? data.message
          : data?.errors.map((err: { msg: string }) => err.msg).join(" /n");
        dispatch(onLogout({ message: message ?? null }));

        setTimeout(() => {
          dispatch(clearErrorMessage());
        }, 10);
        return;
      }

      if (error instanceof Error) {
        dispatch(onLogout({ message: error.message ?? null }));
        setTimeout(() => {
          dispatch(clearErrorMessage());
        }, 10);
      }
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) return dispatch(onLogout());

    try {
      const {
        data: { token, ...user },
      } = await calendarApi.get<AuthResponse>("/auth/refresh-token");

      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin(user));
    } catch (error) {
      localStorage.clear();
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        const message = data.message
          ? data.message
          : data?.errors.map((err: { msg: string }) => err.msg).join(" /n");
        dispatch(onLogout({ message: message ?? null }));

        setTimeout(() => {
          dispatch(clearErrorMessage());
        }, 10);
        return;
      }

      if (error instanceof Error) {
        dispatch(onLogout({ message: error.message ?? null }));
        setTimeout(() => {
          dispatch(clearErrorMessage());
        }, 10);
      }
    }
  };

  const startLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token-init-date");
    dispatch(onLogout());
  };

  return {
    //* Properties
    user,
    status,
    errorMessage,
    //* Methods
    startLogin,
    startLogout,
    startRegister,
    checkAuthToken,
  };
};
