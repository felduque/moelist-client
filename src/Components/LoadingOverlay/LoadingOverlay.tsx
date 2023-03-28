import React, { FC, PropsWithChildren } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import styles from "@/styles/LoadingOverlay.module.css";

type Props = {
  loading: boolean;
};

export const LoadingOverlay: FC<PropsWithChildren & Props> = ({
  children,
  loading,
}) => {
  return (
    <>
      {loading && (
        <div className={styles.loading_overlay}>
          <div className={styles.loading_spinner}>
            <ScaleLoader color="var(--primary-color)" />
          </div>
        </div>
      )}
      {children}
    </>
  );
};
