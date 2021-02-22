import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import type { JobOffer, Company } from "common/interfaces";
import {
  FavoriteOfferToggle,
  FavoriteOfferToggleProps,
} from "components/favorite-offer-toggle";
import styles from "./styles.module.scss";

export type JobOfferProps = JobOffer &
  Partial<Company> &
  Pick<FavoriteOfferToggleProps, "favoriteOffers" | "setFavoriteOffers"> & {
    offerKey: string;
  };

export const JobOfferShort: FunctionComponent<JobOfferProps> = ({
  offerKey,
  jobTitle,
  companyName,
  logotype,
  jobType,
  location: locationName,
  favoriteOffers,
  setFavoriteOffers,
}) => {
  return (
    <section className={styles.jobOfferShort}>
      <Link to={`/${offerKey}`} className={styles.link}>
        <div className={styles.companyLogo}>
          <img
            alt={`${companyName} logo`}
            src={require(`../../${logotype}`).default}
          />
        </div>
        <div className={styles.jobDetails}>
          <div className={styles.jobTitle}>{jobTitle}</div>
          <div className={styles.workplaceDetails}>
            <div className={styles.company}>
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"></path>
              </svg>
              <div className={styles.companyName}>{companyName}</div>
            </div>
            <div className={styles.location}>
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 4.17 4.42 9.92 6.24 12.11.4.48 1.13.48 1.53 0C14.58 18.92 19 13.17 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
              </svg>
              <div className={styles.locationName}>{locationName}</div>
            </div>
            <div>{jobType}</div>
          </div>
        </div>
      </Link>
      <div className={styles.heartContainer}>
        <FavoriteOfferToggle
          offerKey={offerKey}
          favoriteOffers={favoriteOffers}
          setFavoriteOffers={setFavoriteOffers}
        />
      </div>
    </section>
  );
};
