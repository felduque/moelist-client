import React from "react";
import { useRouter } from "next/router";
import style from "@/styles/CardDetail.module.css";
import { useEffect, useState } from "react";
import Head from "next/head";
import { AuthorBox } from "@/Components/Author/AuthorBox";
import { CardTopBar } from "@/Components/CardDetail/CardAuthorBar";
import { ContentType, Scan, User } from "@/utils/types";
import Image from "next/image";
import { getManhuasById } from "@/utils/api/manhua";

const CardManhua = () => {
  const [manhua, setmanhua] = useState<ContentType>();
  const [scans, setScans] = useState<Scan>();
  const [author, setAuthor] = useState<User>();

  const router = useRouter();
  const id =
    router.query["id"] ||
    router.asPath.match(new RegExp(`[&?]${"id"}=(.*)(&|$)`));

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchManhua = async () => {
      const manhua = await getManhuasById(parseInt(id as string));

      setmanhua(manhua?.data);
      setScans(manhua?.data?.Scan);
      setAuthor(manhua?.data?.User);
    };

    fetchManhua();
  }, [id]);

  return (
    <>
      <Head>
        <title>{manhua?.title.slice(0, 60)}</title>
        <meta name="description" content={manhua?.description?.slice(0, 150)} />
        <meta name="keywords" content={manhua?.genres?.join(", ")} />
        <meta name="author" content={author?.userName} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Spanish" />
        <meta name="revisit-after" content="1 days" />
        <meta name="distribution" content="web" />
        <meta name="rating" content="general" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Moelist" />
        <meta name="application-name" content="Moelist" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="google" content="notranslate" />
        <meta
          name="google-site-verification"
          content="google-site-verification"
        />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={manhua?.title?.slice(0, 60)} />
        <meta
          property="og:description"
          content={manhua?.description?.slice(0, 150)}
        />
        <meta property="og:url" content="https://moelist.online" />
        <meta property="og:site_name" content="Moelist" />
        <meta property="og:image" content={manhua?.image} />
        <meta property="og:image:secure_url" content={manhua?.image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={manhua?.title.slice(0, 60)} />
        <meta name="googlebot" content="index, follow" />
        <meta name="googlebot-news" content="index, follow" />
        <meta name="googlebot-video" content="index, follow" />
        <meta name="googlebot-image" content="index, follow" />
        <meta name="googlebot-mobile" content="index, follow" />
        <meta name="robots" content="index, follow" />
        <meta name="robots-news" content="index, follow" />
        <meta name="robots-video" content="index, follow" />
        <meta name="robots-image" content="index, follow" />
        <meta name="robots-mobile" content="index, follow" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />
      </Head>
      <CardTopBar />
      <div className={`container-fluid ${style.bg_card}`}>
        <div className={`row pt-5 ${style.content_sinopsis_and_banner}`}>
          <div className="col-12 col-xl-3 text-center">
            <Image
              className={style.content_primary_card__img}
              src={manhua?.image!}
              alt={manhua?.title!}
              width={440}
              height={440}
            />

            <AuthorBox
              type={manhua?.contentType || ""}
              author={author?.userName || ""}
            />
          </div>
          <div className="col-12 col-xl-9">
            <div className={style.content_sinopsis}>
              <div className={style.title_card_content}>
                <h1 className={style.content_card__title}>{manhua?.title}</h1>
              </div>
              <h2 className={style.content_sinopsis__title}>Sinopsis</h2>
              <p className={style.content_sinopsis__text}>
                {manhua?.description}
              </p>
              <div className={style.content_title_genres}>
                <h2 className={style.content_genre_title}>Generos</h2>
              </div>
              <div className={style.content_sinopsis__generos}>
                {manhua?.genres?.map((genre, index) => (
                  <li
                    key={index}
                    className={style.content_sinopsis__generos__item}
                  >
                    {genre}
                  </li>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={style.content_sinopsis_and_banner}></div>
        <div className="row mx-3 py-5">
          <div className="col-12 col-lg-3">
            <div className={style.content_primary_card__info}>
              <div className={style.content_primary_card__info__title}>
                <h2 className={style.content_primary_card__info__title__text}>
                  Información
                </h2>
              </div>
              <div className={style.content_primary_card__info__content}>
                <div
                  className={style.content_primary_card__info__content__item}
                >
                  <h3
                    className={
                      style.content_primary_card__info__content__item__title
                    }
                  >
                    Tipo
                  </h3>
                  <p
                    className={
                      style.content_primary_card__info__content__item__text
                    }
                  >
                    {manhua?.type}
                  </p>
                </div>
                <div
                  className={style.content_primary_card__info__content__item}
                >
                  <h3
                    className={
                      style.content_primary_card__info__content__item__title
                    }
                  >
                    Episodios
                  </h3>
                  <p
                    className={
                      style.content_primary_card__info__content__item__text
                    }
                  >
                    {manhua?.chapters}
                  </p>
                </div>

                <div
                  className={style.content_primary_card__info__content__item}
                >
                  <h3
                    className={
                      style.content_primary_card__info__content__item__title
                    }
                  >
                    Nuevo Capitulo
                  </h3>
                  <p
                    className={
                      style.content_primary_card__info__content__item__text
                    }
                  >
                    {manhua?.day}
                  </p>
                </div>

                <div
                  className={style.content_primary_card__info__content__item}
                >
                  <h3
                    className={
                      style.content_primary_card__info__content__item__title
                    }
                  >
                    Volumenes
                  </h3>
                  <p
                    className={
                      style.content_primary_card__info__content__item__text
                    }
                  >
                    {manhua?.volumes}
                  </p>
                </div>

                <div
                  className={style.content_primary_card__info__content__item}
                >
                  <h3
                    className={
                      style.content_primary_card__info__content__item__title
                    }
                  >
                    Estado
                  </h3>
                  <p
                    className={
                      style.content_primary_card__info__content__item__text
                    }
                  >
                    {manhua?.status}
                  </p>
                </div>

                <div
                  className={style.content_primary_card__info__content__item}
                >
                  <h3
                    className={
                      style.content_primary_card__info__content__item__title
                    }
                  >
                    Autor
                  </h3>
                  <p
                    className={
                      style.content_primary_card__info__content__item__text
                    }
                  >
                    {manhua?.authors}
                  </p>
                </div>
                <div
                  className={style.content_primary_card__info__content__item}
                >
                  <h3
                    className={
                      style.content_primary_card__info__content__item__title
                    }
                  >
                    Artista
                  </h3>
                  <p
                    className={
                      style.content_primary_card__info__content__item__text
                    }
                  >
                    {manhua?.artists}
                  </p>
                </div>
                <div
                  className={style.content_primary_card__info__content__item}
                >
                  <h3
                    className={
                      style.content_primary_card__info__content__item__title
                    }
                  >
                    Demografia
                  </h3>
                  <p
                    className={
                      style.content_primary_card__info__content__item__text
                    }
                  >
                    {manhua?.demography}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-9 mt-5  mt-lg-0">
            <div className={`row position-sticky ${style.scan_list}`}>
              <div className={style.title_scans_list}>
                Disfruta de todo el contenido en las siguientes paginas
              </div>

              <div className="col-12 col-md-6 col-xl-4">
                <a href={manhua?.urlContent} target="_blank">
                  <div className={style.content_afiliates_logos}>
                    <Image
                      className={style.afiliate_logo}
                      src={scans?.image!}
                      alt={scans?.name!}
                      width={350}
                      height={260}
                    />

                    <h3 className="text-white text-center">{scans?.name}</h3>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className={style.content_primary_card__info_all_content}></div>
        </div>
      </div>
    </>
  );
};

export default CardManhua;
