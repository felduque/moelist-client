import axios, { InternalAxiosRequestConfig } from "axios";

let token = "";

if (typeof window !== "undefined") {
  token = localStorage.getItem("token") || "";
}

const instance = axios.create({
  headers: {
    "x-auth-token": token,
  },
});

export default instance;
