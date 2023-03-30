import React, { FC, PropsWithChildren } from "react";
import { Footer } from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";

type Props = {
  className: string;
};

export const AppLayout: FC<PropsWithChildren & Props> = ({
  className,
  children,
}) => {
  return (
    <>
      <main className={className}>
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  );
};
