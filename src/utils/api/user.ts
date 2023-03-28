import axios from "./axios";
import { ContentType, GetUserResponseType, UpdateUserParams } from "../types";

export const getUserById = async (id: number) => {
  try {
    const res = await axios.get<GetUserResponseType>(
      `https://apix.moelist.online/getuserid/${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id: number, data: UpdateUserParams) => {
  console.log(data, id);
  try {
    const token = localStorage.getItem("token");
    const res = await axios.patch(
      `https://apix.moelist.online/updateuser/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFavorite = async (
  type: string,
  idContent: number,
  idUser: number
) => {
  try {
    const res = await axios.delete(
      "https://apix.moelist.online/deletefavorite/",
      {
        data: {
          type,
          idContent,
          idUser,
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getFavorites = async (id: string) => {
  try {
    const res = await axios.get<ContentType[]>(
      `https://apix.moelist.online/getfavorites/${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addFavorite = async (
  type: string,
  idContent: number,
  idUser: number
) => {
  try {
    const res = await axios.post<ContentType>(
      `https://apix.moelist.online/addfavorite`,
      {
        type,
        idContent,
        idUser,
      }
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};
