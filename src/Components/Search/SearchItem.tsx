import React, { useContext, FC } from "react";

import { AuthContext } from "../../utils/context/AuthContext";
import { ContentType } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/router";

export const SearchItem: FC<ContentType> = ({
  id,
  image,
  title,
  description,
  contentType,
}) => {
  const { mobileMenuCloseRef } = useContext(AuthContext);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${contentType}/${id}`);
    mobileMenuCloseRef?.current?.click();
  };

  return (
    <div className="row mb-3">
      <div className="col-3">
        <Image
          className="img-fluid search-img"
          src={image}
          alt={title}
          height={150}
          role="button"
          width={125}
          onClick={() => handleClick()}
        />
      </div>
      <div className="col-9 text-white text-start">
        <h5
          role="button"
          className="fw-bold content-title"
          onClick={() => handleClick()}
        >
          {title}
        </h5>
        <p className="search_desc">{description}</p>
      </div>
    </div>
  );
};
