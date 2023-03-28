import React, { useContext, FC } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { BsTrashFill } from "react-icons/bs";
import { addFavorite, deleteFavorite } from "@/utils/api/user";
import { useAppContext } from "@/utils/state";

type Props = {
  action: string;
  contentId: number;
  type: string;
  isAdded: boolean;
  userId: number;
};

export const CardItemAction: FC<Props> = ({
  action,
  contentId,
  type,
  isAdded,
  userId,
}) => {
  const authContext = useAppContext();

  const addToFavorites = async () => {
    const resp = await addFavorite(type, contentId, userId);
    const { setFavorites, favorites } = authContext;

    if (resp?.status === 200)
      setFavorites([
        {
          id: resp.data.id,
          title: resp.data.title,
          contentType: resp.data.contentType,
          demography: resp.data.demography,
          description: resp.data.description,
          image: resp.data.image,
        },
        ...favorites,
      ]);
  };

  const removeFromFavorites = async () => {
    const deleted = await deleteFavorite(type, contentId, userId);
    const { setFavorites, favorites } = authContext;

    if (deleted?.status === 200) {
      const favCopy = [...favorites];
      const favIndex = favCopy.findIndex(
        (fav) => fav.id == contentId && fav.contentType == type
      );
      favCopy.splice(favIndex, 1);

      setFavorites(favCopy);
    }
  };

  return isAdded ? (
    action === "add" ? (
      <HiHeart className="position-absolute action added" />
    ) : (
      <BsTrashFill
        className="position-absolute action"
        onClick={() => removeFromFavorites()}
      />
    )
  ) : (
    <HiOutlineHeart
      onClick={() => addToFavorites()}
      className="position-absolute action"
    />
  );
};
