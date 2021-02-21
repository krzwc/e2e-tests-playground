import { FunctionComponent, useState, useEffect } from "react";
import { compose, identity } from "ramda";
import { JobOfferShort } from "components/job-offer-short";
import { FavoriteOffersFilter } from "components/favorite-offers-filter";
import { LocationFilter } from "components/location-filter";
import { useDebounce } from "hooks/use-debounce";
import { JobOffer } from "common/interfaces";
import { Input } from "components/input";
import { jobOffersData, companiesData } from "common/data";
import { localStorageFacade } from "common/helpers";
import {
  findCompanyByID,
  filterByFavorite,
  filterByLocation,
  filterBySearchTerm,
  locations,
} from "./helpers";
import styles from "./styles.module.scss";

export const JobBoard: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [jobOffers, setJobOffers] = useState<JobOffer[]>(jobOffersData);
  const [favoriteOffers, setFavoriteOffers] = useState<string[]>(
    localStorageFacade.getFavoriteJobOffers()
  );
  const [location, setLocation] = useState<string>("");
  const [filterFavoriteOn, setFilterFavoriteOn] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const filterBySearchTermFunction =
    debouncedSearchTerm !== "" ? filterBySearchTerm : identity;
  const filterByFavoriteFunction = filterFavoriteOn
    ? filterByFavorite
    : identity;
  const filterByLocationFunction =
    location !== "" ? filterByLocation : identity;
  useEffect(() => {
    setJobOffers(
      compose(
        filterBySearchTermFunction,
        filterByFavoriteFunction,
        filterByLocationFunction
      )({
        jobOffers: jobOffersData,
        companiesData,
        term: debouncedSearchTerm,
        favoriteOffers,
        location,
      }).jobOffers
    );
  }, [
    filterBySearchTermFunction,
    filterByFavoriteFunction,
    filterByLocationFunction,
    debouncedSearchTerm,
    filterFavoriteOn,
    favoriteOffers,
    location,
  ]);
  useEffect(() => {
    localStorageFacade.updateFavoriteJobOffers(favoriteOffers);
  }, [favoriteOffers]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  return (
    <article>
      <div className={styles.filters}>
        <Input onChange={onChangeHandler} />
        <LocationFilter
          location={location}
          locations={locations(jobOffersData)}
          onChange={setLocation}
        />
        <FavoriteOffersFilter
          onClickHandler={setFilterFavoriteOn}
          filterFavoriteOn={filterFavoriteOn}
        />
      </div>
      {jobOffers.map((offer) => {
        // TODO isArray
        const companyData = findCompanyByID(offer.companyId, companiesData);
        return (
          <JobOfferShort
            {...offer}
            offerKey={offer.key}
            companyName={companyData?.companyName}
            logotype={companyData?.logotype}
            favoriteOffers={favoriteOffers}
            setFavoriteOffers={setFavoriteOffers}
          />
        );
      })}
    </article>
  );
};
