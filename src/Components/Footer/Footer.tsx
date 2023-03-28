import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <>
      <div className="footer-container py-3 px-3  px-md-5">
        <div className="footer-copyrigh-message m-0 text-center">
          <p className="m-0">© 2023 MoeList</p>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>

        <p className="about-us">
          Moelist nace como iniciativa que permita a los usuarios obtener
          informacion de sus animes favoritos en español como titulo, sinopsis,
          fecha de lanzamiento, capitulos, calendario, fuentes premium para
          visualizar el contenido como Crunchyroll y demas informacion. Se busca
          impulsar muchisimo mas este amor por la cultura Occidental que se
          encuentra en constante crecimiento y moelist busca ser una opcion en
          Español y que permita a los usuarios crear su propia biblioteca con
          animes que este asistiendo, pausado, finalizado y ver depues.
        </p>
      </div>
    </>
  );
};
