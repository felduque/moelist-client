import axios from "./axios";
import { RegisterParams } from "../types";

export const registerUser = async (user: RegisterParams) => {
  try {
    const res = await axios.post("https://apix.moelist.online/register", user);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
