import axios from "./axios";
import { ContentType, filtersResponseType, FiltersType } from "../types";

export const search = async (
  filters?: FiltersType,
  limit: number = 18,
  page: number = 1
) => {
  const response = await axios.get<filtersResponseType>(
    `https://apix.moelist.online/filter?type=${filters?.type}&demography=${filters?.demography}&status=${filters?.status}&genres=${filters?.genres}&limit=${limit}&page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const searchTitle = async (title: string) => {
  const response = await axios.get<ContentType[]>(
    `https://apix.moelist.online/filter/title?title=${title}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const getContentAndPaginate = async (page = 1, limit = 24) => {
  const response = await axios.get<ContentType[]>(
    `https://apix.moelist.online/pagination/?page=${page}&limit=${limit}`
  );

  return response;
};
