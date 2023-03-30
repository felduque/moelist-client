import Head from "next/head";
import Home from "./Home";
import Script from "next/script";

export default function Index() {
  return (
    <>
      <Head>
        <link rel="png" href="https://i.imgur.com/l1qGsij.png" />
      </Head>
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4512388051733069"
        strategy="lazyOnload"
      />

      <main>
        <Home />
      </main>
    </>
  );
}
