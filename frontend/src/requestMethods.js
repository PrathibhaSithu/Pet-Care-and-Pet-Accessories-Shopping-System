import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";

const user = JSON.parse(localStorage.getItem("user"));
const token = user && user.token;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${token}` }
});