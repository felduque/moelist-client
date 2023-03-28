import { CardLoop } from "@/components/CardLoop/CardLoop";
import { ExploradorOrder } from "@/components/Explorador/ExploradorOrder/ExploradorOrder";
import { ExploradorSearch } from "@/components/Explorador/ExploradorSearch/ExploradorSearch.";
import { ExploradorSidebar } from "@/components/Explorador/ExploradorSidebar/ExploradorSidebar";
import { LoadingOverlay } from "@/components/LoadingOverlay/LoadingOverlay";
import { Pagination } from "@/components/Pagination/Pagination";
import { search } from "@/utils/api/search";
import { ExploradorContext } from "@/utils/context/ExploradorContext";
import { ContentType, FiltersType } from "@/utils/types";

import React, { useState } from "react";

const initFilters = {
  type: "Anime",
  demography: "",
  status: "",
  genres: [],
};

export const Explorador = () => {
  const [items, setItems] = useState<ContentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState<FiltersType>(initFilters);

  const handlePageChange = async (selected: number) => {
    setLoading(true);
    const { data } = await search(filters, 18, selected + 1);
    setLoading(false);
    setItems(data.result);
  };

  return (
    <ExploradorContext.Provider
      value={{
        setItems,
        items,
        setLoading,
        loading,
        filters,
        setFilters,
        setCount,
      }}
    >
      <LoadingOverlay loading={loading}>
        <section className="container-fluid bg-dark px-4 px-md-5 pb-5">
          <div className="row py-5">
            <ExploradorSearch />
          </div>
          <div className="row">
            <div className="col-lg-3 text-white">
              <ExploradorSidebar />
            </div>
            <div className="col-lg-9 text-white">
              <div className="mb-4">
                <ExploradorOrder />
              </div>
              <CardLoop cards={items} />
              <Pagination
                totalItems={count}
                itemsPerPage={18}
                onPageChange={handlePageChange}
                pages={Math.ceil(count / 18)}
              />
            </div>
          </div>
        </section>
      </LoadingOverlay>
    </ExploradorContext.Provider>
  );
};
