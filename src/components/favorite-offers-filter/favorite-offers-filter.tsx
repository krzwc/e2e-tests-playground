import { FunctionComponent, Dispatch, SetStateAction } from "react";
import { Heart } from "components/heart";
import { classNames } from "common/helpers";
import styles from "./styles.module.scss";

export interface FavoriteOfferToggleProps {
  onClickHandler: Dispatch<SetStateAction<boolean>>;
  filterFavoriteOn: boolean;
}

export const FavoriteOffersFilter: FunctionComponent<FavoriteOfferToggleProps> = ({
  onClickHandler,
  filterFavoriteOn,
}) => {
  return (
    <div
      className={classNames(
        styles.filterHeartContainer,
        filterFavoriteOn ? styles.filterOn : ""
      )}
    >
      <Heart
        className="filter"
        onClickHandler={() => onClickHandler((on) => !on)}
      />
    </div>
  );
};
