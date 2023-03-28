import { getContentAndPaginate } from "@/utils/api/search";
import { ContentType } from "@/utils/types";
import React, { useState, useEffect } from "react";
import { CardLoop } from "../CardLoop/CardLoop";

import styles from "@/styles/HomeMain.module.css";

export const HomeMain = () => {
  const [animes, setAnimes] = useState<ContentType[]>([]);
  const [mangas, setMangas] = useState<ContentType[]>([]);
  const [manhwas, setManhwas] = useState<ContentType[]>([]);
  const [manhuas, setManhuas] = useState<ContentType[]>([]);

  useEffect(() => {
    const fetchAnimes = async () => {
      const resp = await getContentAndPaginate(1, 12);
      const content = resp.data;

      setAnimes(content.filter((c: ContentType) => c.contentType === "anime"));
      setManhuas(
        content.filter((c: ContentType) => c.contentType === "manhua")
      );
      setManhwas(
        content.filter((c: ContentType) => c.contentType === "manhwa")
      );
      setMangas(content.filter((c: ContentType) => c.contentType === "manga"));
    };
    fetchAnimes();
  }, []);

  return (
    <div className={`${styles.content_primary_main}`}>
      <div
        className={`${styles.content_all_main}content-all-main pt-5 container `}
      >
        <div className={styles.alert_page}>
          <h2 className={styles.alert_page_text}>
            Estas son las <span className="txt-primary">novedades en Moelist:</span>
            <ul className="mt-3">
              <li>Ya puedes registrarte </li>
              <li>
                Guarda tu contenido favorito y accede a el desde cualquier
                dispositivo
              </li>
              <li>Explora todos los contenidos de la página</li>
              <li>Diseños más amigables</li>
              <li>Conviértete en Autor y empezá a publicar contenido</li>
            </ul>
          </h2>
        </div>
        <div className={styles.content_title_category}>
          <h2 className="text-white">Animes</h2>
        </div>
        <CardLoop cards={animes} />
        <div className={styles.content_title_category}>
          <h2 className="text-white">Mangas</h2>
        </div>
        <CardLoop cards={mangas} />
        <div className={styles.content_title_category}>
          <h2 className="text-white">Manhwas</h2>
        </div>
        <CardLoop cards={manhwas} />

        <div className={styles.content_title_category}>
          <h2 className="text-white">Manhuas</h2>
        </div>
        <CardLoop cards={manhuas} />
      </div>
    </div>
  );
};
