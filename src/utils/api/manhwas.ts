import axios from "./axios";
import { ContentType, CreatePublicationParams } from "../types";

export const getManhwas = async () => {
  const response = await axios.get<ContentType[]>(
    `https://apix.moelist.online/manhwas`
  );
  return response;
};

export const getManhwasById = async (id: number) => {
  const response = await axios.get<ContentType>(
    `https://apix.moelist.online/manhwa/${id}`
  );
  return response;
};

export const updateManhwa = async (
  id: number,
  img: File | string,
  manhwa?: ContentType
) => {
  if (typeof img === "string") return;
  const token = localStorage.getItem("token");
  const response = await axios.patch(
    `https://apix.moelist.online/manhwa/${id}`,
    {
      image: img,
    },
    {
      headers: {
        "content-type": "multipart/form-data",
        "x-auth-token": token,
      },
    }
  );
  return response;
};

export const lastManhwa = async () => {
  const response = await axios.get<ContentType[]>(
    `https://apix.moelist.online/lastmanhwas`
  );
  return response;
};

export const createManhwa = async (manhwa: CreatePublicationParams) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `https://apix.moelist.online/manhwa`,
    manhwa,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return response;
};
