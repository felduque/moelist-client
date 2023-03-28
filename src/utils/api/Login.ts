import axios from "./axios";
import { LoginParams, LoginResp } from "../types";

export const loginUser = async (user: LoginParams) => {
  try {
    const res = await axios.post<LoginResp>(
      "https://apix.moelist.online/login",
      user
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
