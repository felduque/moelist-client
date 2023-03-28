import { UserSettings } from "@/components/User/UserSettings";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import Layout from "../../../components/layouts/layout";
import dynamic from "next/dynamic";

const DynamicPublication = dynamic(
  async () =>
    await import("@/components/User/UserPublication").then(
      (module) => module.UserPublication
    )
);
const DynamicFavorites = dynamic(
  async () =>
    await import("@/components/User/UserFavorites").then(
      (comp) => comp.UserFavorites
    )
);

const Index: NextPageWithLayout = () => {
  const router = useRouter();
  const [content, setContent] = useState(<UserSettings />);
  const { action } = router.query;

  useEffect(() => {
    switch (action) {
      case "configurar":
        setContent(<UserSettings />);
        break;

      case "favoritos":
        setContent(<DynamicFavorites />);
        break;

      case "publicar":
        setContent(<DynamicPublication />);
        break;

      default:
        setContent(<UserSettings />);
        break;
    }
  }, [action]);

  return content;
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Index;
