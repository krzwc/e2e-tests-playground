import { FunctionComponent, Dispatch, SetStateAction } from "react";
import { Heart } from "components/heart";

export interface FavoriteOfferToggleProps {
  offerKey: string;
  setFavoriteOffers: Dispatch<SetStateAction<string[]>>;
  favoriteOffers: string[];
}

export const FavoriteOfferToggle: FunctionComponent<FavoriteOfferToggleProps> = ({
  offerKey,
  setFavoriteOffers,
  favoriteOffers,
}) => {
  const isFavorite = favoriteOffers.some((offer) => offer === offerKey);
  const onClickHandler = () => {
    if (!isFavorite) {
      setFavoriteOffers([...favoriteOffers, offerKey]);
    } else {
      setFavoriteOffers(favoriteOffers.filter((offer) => offer !== offerKey));
    }
  };

  return (
    <Heart
      className={isFavorite ? "red" : ""}
      onClickHandler={onClickHandler}
    />
  );
};
