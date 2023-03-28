import { createContext } from "react";

import { ContentType, FiltersType } from "../types";

type ExploradorContextType = {
  items: ContentType[];
  filters?: FiltersType | {};
  setItems: (items: ContentType[]) => void;
  setFilters: (filters: FiltersType) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setCount: (count: number) => void;
};

export const ExploradorContext = createContext<ExploradorContextType>({
  items: [],
  filters: {},
  setItems: () => {},
  setFilters: () => {},
  loading: true,
  setLoading: () => {},
  setCount: () => {},
});
