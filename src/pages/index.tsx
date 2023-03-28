import Head from "next/head";
import { Poppins } from "next/font/google";
import Home from "./Home";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "600"],
  subsets: ["latin"],
});

export default function Index() {
  return (
    <>
      <Head>
        <link rel="png" href="/logo.png" />
      </Head>
      <main>
        <Home />
      </main>
    </>
  );
}
