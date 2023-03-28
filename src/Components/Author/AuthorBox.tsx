import { FC } from "react";

type Props = {
  type: string;
  author: string;
};

export const AuthorBox: FC<Props> = ({ type, author }) => {
  return (
    <>
      <div className={`py-2 fs-5 mb-4 fw-bold ${type}`}> {author} </div>
    </>
  );
};
