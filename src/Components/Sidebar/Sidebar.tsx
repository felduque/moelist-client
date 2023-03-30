import { lastAnime } from "@/utils/api/anime";
import { lastManga } from "@/utils/api/manga";
import { lastManhua } from "@/utils/api/manhua";
import { lastManhwa } from "@/utils/api/manhwas";
import { ContentType } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { CardLoop } from "../CardLoop/CardLoop";

export const Sidebar = () => {
  const [ultimos, setUltimos] = useState<ContentType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await lastAnime();
      const response2 = await lastManga();
      const response3 = await lastManhua();
      const response4 = await lastManhwa();
      const data = response?.data || [];

      console.log(data);
      const data2 = response2.data;
      const data3 = response3.data;
      const data4 = response4.data;
      setLoading(false);
      setUltimos([...data, ...data2, ...data3, ...data4]);
    };
    fetchData();
  }, []);

  console.log(ultimos);
  return (
    <div className="sidebar-container-rigth pt-5">
      <div className="sidebar-container-cards container">
        <div className="sidebar-content-title-list-cards">
          <h2 className="sidebar-text-title-list-cards">Ultimos Agregados</h2>
        </div>
        <CardLoop
          cards={ultimos}
          oneCol={true}
          showDesc={false}
          loading={loading}
          skeletonCount={6}
        />
      </div>
    </div>
  );
};
