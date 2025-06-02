import axios from "axios";

import { getConfig } from "../helpers";

const { VITE_API_URL } = getConfig();

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

calendarApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default calendarApi;
