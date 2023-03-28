import { ContentType, CreatePublicationParams } from "@/utils/types";
import axios from "./axios";

export const getAnimes = async () => {
  const response = await axios.get<ContentType[]>(
    `https://apix.moelist.online/animes`
  );
  return response;
};

export const getAnimeById = async (id: number) => {
  const response = await axios.get<ContentType>(
    `https://apix.moelist.online/anime/${id}`
  );
  return response;
};

export const createAnime = async (anime: CreatePublicationParams) => {
  const token = localStorage.getItem("token");
  console.log(token);
  const response = await axios.post(
    `https://apix.moelist.online/anime`,
    anime,
    {
      // se envia token
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return response;
};

export const lastAnime = async () => {
  try {
    const response = await axios.get<ContentType[]>(
      `https://apix.moelist.online/lastanime`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateAnime = async (
  id: number,
  img: File | string,
  anime?: CreatePublicationParams
) => {
  if (typeof img === "string") return;
  const token = localStorage.getItem("token");
  const response = await axios.patch(
    `https://apix.moelist.online/anime/${id}`,
    { image: img },
    {
      headers: {
        "content-type": "multipart/form-data",
        "x-auth-token": token,
      },
    }
  );
  return response;
};
