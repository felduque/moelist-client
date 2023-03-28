import React, { useState, useEffect } from "react";
import { searchTitle } from "@/utils/api/search";
import { ContentType } from "@/utils/types";
import { ScaleLoader } from "react-spinners";
import { SearchItem } from "./SearchItem";
import { useRouter } from "next/router";

export const Search = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [searchItems, setSearchItems] = useState<ContentType[]>([]);
  const router = useRouter();

  //  es para que no bombardee el servidor fetch cada vez que se escriba algo en el search
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (search.length < 2) return;

    setSearchItems([]); // vacia el search
    setLoading(true);

    const fetchSearch = async () => {
      const items = await searchTitle(search);
      setLoading(false);
      setSearchItems(items?.data);
    };

    clearTimeout(typingTimer);

    setTypingTimer(
      setTimeout(() => {
        fetchSearch();
      }, 1000)
    );
  }, [search]);

  useEffect(() => {
    setSearch("");
  }, [router.asPath]);

  return (
    <div className="search-wrapper">
      <input
        className="navbar-container__search__input"
        type="search"
        value={search}
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <div className="autocom-box text-center px-3 pt-3">
          {loading && <ScaleLoader color="var(--primary-color)" />}
          {searchItems.slice(0, 3).map((item) => (
            <SearchItem key={item.id} {...item} />
          ))}
          {searchItems.length === 0 && !loading && (
            <p>No se pudo encontrar tu busqueda</p>
          )}
        </div>
      )}
    </div>
  );
};
