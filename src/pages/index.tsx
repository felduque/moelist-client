import Head from "next/head";
import { Poppins } from "next/font/google";
import Home from "./Home";
import Script from "next/script";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "600"],
  subsets: ["latin"],
});

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
