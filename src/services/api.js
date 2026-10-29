import axios from "axios";

const fallbackApiUrl = "https://jsonplaceholder.typicode.com";
const envBaseUrl =
  typeof process !== "undefined" && process.env
    ? process.env.EXPO_BASE_URL || process.env.EXPO_PUBLIC_API_URL
    : null;

const API_URL = (envBaseUrl || fallbackApiUrl).replace(/\/$/, "");

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

