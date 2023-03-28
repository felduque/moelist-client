import axios from "./axios";
import { ContentType, CreatePublicationParams } from "../types";

export const getManhuas = async () => {
  const response = await axios.get<ContentType[]>(
    `https://apix.moelist.online/manhuas`
  );
  return response;
};

export const getManhuasById = async (id: number) => {
  const response = await axios.get<ContentType>(
    `https://apix.moelist.online/manhua/${id}`
  );
  return response;
};

export const updateManhua = async (
  id: number,
  img: File | string,
  manhua?: ContentType
) => {
  if (typeof img === "string") return;
  const token = localStorage.getItem("token");
  const response = await axios.patch(
    `https://apix.moelist.online/manhua/${id}`,
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

export const lastManhua = async () => {
  const response = await axios.get<ContentType[]>(
    `https://apix.moelist.online/lastmanhuas`
  );
  return response;
};

export const createManhua = async (manhua: CreatePublicationParams) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `https://apix.moelist.online/manhua`,
    manhua,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return response;
};
