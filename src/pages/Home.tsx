import React from "react";
import Head from "next/head";
import { HomeMain } from "@/Components/Main/HomeMain";
import { Sidebar } from "@/Components/Sidebar/Sidebar";

import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <>
      <Head>
        <title>Moelist | Manga y Anime todo en un solo lugar</title>
        <meta
          name="description"
          content="Moelist es una plataforma de anime y manga donde puedes encontrar todo lo que necesitas para disfrutar de tus animes y mangas favoritos"
        />
        {/* SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />
        {/* OG */}
        <meta property="og:locale" content="es_ES" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Moelist | Manga y Anime todo en un solo lugar"
        />
        <meta
          property="og:description"
          content="Moelist es una plataforma de anime y manga donde puedes encontrar todo lo que necesitas para disfrutar de tus animes y mangas favoritos"
        />
        <meta property="og:url" content="https://moelist.online" />
        <meta property="og:site_name" content="Moelist" />
        <meta property="og:image" content="https://i.imgur.com/l1qGsij.png" />
        <meta
          property="og:image:secure_url"
          content="https://i.imgur.com/l1qGsij.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="Moelist es una plataforma de anime y manga donde puedes encontrar todo lo que necesitas para disfrutar de tus animes y mangas favoritos"
        />
        <meta
          name="twitter:title"
          content="Moelist | Manga y Anime todo en un solo lugar"
        />
        <meta name="twitter:image" content="https://i.imgur.com/l1qGsij.png" />
        <meta name="twitter:site" content="@MoelistOnline" />
        <meta name="twitter:creator" content="@MoelistOnline" />
      </Head>
      <section className={`${styles.container_home_grid} px-5 `}>
        {/* maquetacion grid main, sidebar lateral derecho   y footer*/}
        <div className={styles.container_home_grid__main}>
          <HomeMain />
        </div>
        <div className={styles.container_home_grid__sidebar}>
          <Sidebar />
        </div>
      </section>
    </>
  );
};

export default Home;
