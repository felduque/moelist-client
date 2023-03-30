import React, { FC } from "react";
import { CardItem } from "../CardItem/CardItem";
import { motion, AnimatePresence } from "framer-motion";
import { ContentType } from "../../utils/types";
import { CardSkeleton } from "@/Components/CardSkeleton/CardSkeleton";

type Props = {
  cards: ContentType[];
  oneCol?: boolean;
  showDesc?: boolean;
  action?: "add" | "remove";
  loading?: boolean;
  skeletonCount?: number;
};

export const CardLoop: FC<Props> = ({
  cards,
  oneCol = false,
  showDesc = true,
  action = "add",
  loading = false,
  skeletonCount = 12,
}) => {
  const colsStyles = oneCol
    ? "row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-1"
    : "row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-6";

  return (
    <motion.div layout className={`row ${colsStyles}`}>
      {loading && <CardSkeleton count={skeletonCount} />}
      <AnimatePresence>
        {cards.map((card, index) => {
          return (
            <CardItem
              key={card.id + card.contentType}
              content={card}
              showHover={showDesc}
              index={index}
              action={action}
            />
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};
