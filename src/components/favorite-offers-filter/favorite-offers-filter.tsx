import { FunctionComponent, Dispatch, SetStateAction } from "react";
import { Heart } from "components/heart";
import styles from "./styles.module.scss";

export interface FavoriteOfferToggleProps {
  onClickHandler: Dispatch<SetStateAction<boolean>>;
}

export const FavoriteOffersFilter: FunctionComponent<FavoriteOfferToggleProps> = ({
  onClickHandler,
}) => {
  return (
    <div className={styles.filterHeartContainer}>
      <Heart
        className={"filter"}
        onClickHandler={() => onClickHandler((on) => !on)}
      />
    </div>
  );
};
