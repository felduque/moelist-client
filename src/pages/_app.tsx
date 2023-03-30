import "bootstrap/dist/css/bootstrap.min.css";

import "@/styles/globals.css";
import "@/styles/navbar.css";
import "@/styles/loginRegisterForm.css";
import "@/styles/footer.css";
import "@/styles/search.css";
import "@/styles/cardItem.css";

import type { AppProps } from "next/app";
import { useEffect } from "react";
import { AppWrapper } from "@/utils/state";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

import { AppLayout } from "@/Components/layouts/AppLayout";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "600"],
  subsets: ["latin"],
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <AppWrapper>
        <AppLayout className={poppins.className}>
          {getLayout(<Component {...pageProps} />)}
        </AppLayout>
      </AppWrapper>
    </>
  );
}
