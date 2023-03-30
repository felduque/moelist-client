import { FC } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {
  count: number;
};

export const CardSkeleton: FC<Props> = ({ count }) => {
  const rows = [];
  for (let i = 0; i < count; i++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    rows.push(<SkeletonComponent key={i} />);
  }

  return <>{rows.map((item) => item)}</>;
};

const SkeletonComponent = () => {
  return (
    <>
      <div>
        <Skeleton height={250} />
        <p>
          <Skeleton height={25} />
        </p>
      </div>
    </>
  );
};
