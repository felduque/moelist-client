import dynamic from "next/dynamic";
import Head from "next/head";
const DynamicExplorador = dynamic(
  async () =>
    await import(
      "@/Components/Explorador/ExploradorContent/ExploradorContent"
    ).then((module) => module.Explorador)
);

const ExploradorPage = () => {
  return (
    <>
      <Head>
        <title>Moelist | Explorador</title>
        <meta
          name="description"
          content="Filtra todos los contenidos de Moelist por categorias"
        />
        {/* SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />
        {/* OG */}
        <meta property="og:locale" content="es_ES" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Moelist | Explorador" />
        <meta
          property="og:description"
          content="Filtra todos los contenidos de Moelist por categorias"
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
          content="Filtra todos los contenidos de Moelist por categorias"
        />
        <meta name="twitter:title" content="Moelist | Explorador" />
        <meta name="twitter:image" content="https://i.imgur.com/l1qGsij.png" />
        <meta name="twitter:site" content="@MoelistOnline" />
        <meta name="twitter:creator" content="@MoelistOnline" />
      </Head>
      <DynamicExplorador />;
    </>
  );
};

export default ExploradorPage;
