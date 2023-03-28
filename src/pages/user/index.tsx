import React, { ReactElement, useEffect } from "react";

import { NextPageWithLayout } from "../_app";
import Layout from "@/Components/layouts/layout";
import { UserSettings } from "@/Components/User/UserSettings";
import { useRouter } from "next/router";

const UserPage: NextPageWithLayout = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/user/configurar");
  }, []);

  return <UserSettings />;
};

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default UserPage;
