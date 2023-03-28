import React, { FC, useContext } from "react";
import Link from "next/link";
import Image from "next/image";

import { CardItemAction } from "./CardAction";
import { findFavorite } from "@/utils/helpers";
import { ContentType } from "@/utils/types";

import { motion } from "framer-motion";
import { useAppContext } from "@/utils/state";

type Props = {
  content: ContentType;
  index: number;
  action: "add" | "remove";
  showHover: boolean;
};

export const CardItem: FC<Props> = ({ content, index, action, showHover }) => {
  const { contentType, id, title, demography, description, image } = content;
  const authContext = useAppContext();

  const isLastOfRow = (index + 1) % 6 === 0;
  const isAdded = findFavorite(id, contentType, authContext?.favorites);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      layout
      className="col mb-4"
    >
      <div className="card-item text-decoration-none">
        <div className="card-inner text-center">
          <div className="card-image position-relative mb-2">
            <Link href={`/${contentType}/${id}`}>
              <Image
                src={image}
                className="content-card-main-banner"
                alt={title}
                width={195}
                height={250}
              />

              <div className="demography text-white position-absolute text-center w-100">
                {demography}
              </div>

              <span
                className={`badge rounded-pill ${contentType} position-absolute pill text-uppercase fw-bold`}
              >
                {contentType}
              </span>
            </Link>

            {authContext?.user && (
              <CardItemAction
                isAdded={isAdded}
                userId={authContext?.user.id}
                type={contentType}
                contentId={id}
                action={action}
              />
            )}
          </div>

          <Link
            href={`/${contentType}/${id}`}
            className="fw-bold text-white text-center w-100 content-title"
          >
            {title}
          </Link>
        </div>

        {showHover && (
          <div
            className="hover-desc"
            style={{
              right: isLastOfRow ? "100%" : "unset",
              left: !isLastOfRow ? "100%" : "unset",
            }}
          >
            <strong className="text-white content-title">{title}</strong>
            <span
              className={`badge rounded-pill ${contentType} my-3 d-block pill text-uppercase fw-bold`}
            >
              {contentType}
            </span>
            <p className="desc">{description}</p>

            <button
              type="button"
              className={`btn text-uppercase text-white fw-bold d-block ms-auto ${contentType} button-desc`}
            >
              ver {contentType}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
