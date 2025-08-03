// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:6080", // Thay bằng URL BE bạn
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
