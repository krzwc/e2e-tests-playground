import { FunctionComponent, useState, useEffect } from "react";
import { compose, identity } from "ramda";
import { JobOfferShort } from "components/job-offer-short";
import { FavoriteOffersFilter } from "components/favorite-offers-filter";
import { LocationFilter } from "components/location-filter";
import useDebounce from "hooks/use-debounce";
import { JobOffer, Company } from "common/interfaces";
import { Input } from "components/input";
import { jobOffersData, companiesData } from "common/data";
import { localStorageFacade } from "common/helpers";
import styles from "./styles.module.scss";

const findCompanyByID = (companyId: string, companiesData: Company[]) =>
  companiesData.find((company) => company.key === companyId);

interface Filter {
  jobOffers: JobOffer[];
  companiesData?: Company[];
  term?: string;
  favoriteOffers?: string[];
  location?: string;
}

const filterBySearchTerm = (filterData: Filter): Filter => {
  const { jobOffers, companiesData = [], term = "" } = filterData;
  return {
    ...filterData,
    jobOffers: jobOffers.filter(
      (jobOffer) =>
        (findCompanyByID(jobOffer.companyId, companiesData)?.companyName ?? "")
          .toLowerCase()
          .includes(term.toLowerCase()) ||
        jobOffer.jobTitle.toLowerCase().includes(term.toLowerCase())
    ),
  };
};

const locations = (jobOffers: JobOffer[]) =>
  Array.from(new Set(jobOffers.map((jobOffer) => jobOffer.location)));

const filterByFavorite = (filterData: Filter): Filter => {
  const { jobOffers, favoriteOffers = [] } = filterData;
  return {
    ...filterData,
    jobOffers: jobOffers.filter((jobOffer) =>
      favoriteOffers.includes(jobOffer.key)
    ),
  };
};

const filterByLocation = (filterData: Filter): Filter => {
  const { jobOffers, location } = filterData;
  return {
    ...filterData,
    jobOffers: jobOffers.filter(
      ({ location: offerLocation }) => offerLocation === location
    ),
  };
};

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
  const FilterByLocationFunction =
    location !== "" ? filterByLocation : identity;
  useEffect(() => {
    setJobOffers(
      compose(
        filterBySearchTermFunction,
        filterByFavoriteFunction,
        FilterByLocationFunction
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
    FilterByLocationFunction,
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
          locations={locations(jobOffersData)}
          onChange={setLocation}
        />
        <FavoriteOffersFilter onClickHandler={setFilterFavoriteOn} />
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
