import { useRouter } from "next/router";
import React, { PropsWithChildren, FC } from "react";
import { useAuth } from "../../hooks/useAuth";

export const AuthenticatedRoute: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) {
    return <div>loading</div>;
  } else {
    if (user) return <> {children} </>;
    router.replace("/");
    return <></>;
  }
};
