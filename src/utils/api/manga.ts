import axios from "./axios";
import { ContentType, CreatePublicationParams } from "../types";

export const getMangas = async () => {
  const response = await axios.get<ContentType[]>(
    `https://apix.moelist.online/mangas`
  );
  return response;
};

export const getMangasById = async (id: number) => {
  const response = await axios.get(`https://apix.moelist.online/manga/${id}`);
  return response;
};

export const updateManga = async (
  id: number,
  img: File | string,
  manga?: ContentType
) => {
  if (typeof img === "string") return;
  const token = localStorage.getItem("token");
  const response = await axios.patch(
    `https://apix.moelist.online/manga/${id}`,
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

export const lastManga = async () => {
  const response = await axios.get<ContentType[]>(
    `https://apix.moelist.online/lastmangas`
  );
  return response;
};

export const createManga = async (manga: CreatePublicationParams) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `https://apix.moelist.online/manga`,
    manga,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return response;
};
