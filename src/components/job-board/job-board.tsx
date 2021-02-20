import { FunctionComponent, useState, useEffect } from "react";
import { JobOfferShort } from "components/job-offer-short";
import { FavoriteOffersFilter } from "components/favorite-offers-filter";
import { LocationFilter } from "components/location-filter";
import useDebounce from "hooks/use-debounce";
import { JobOffer, Company } from "common/interfaces";
import { Input } from "../input";
import { jobOffersData, companiesData } from "common/data";
import { localStorageFacade } from "common/helpers";
import styles from "./styles.module.scss";

const findCompanyByID = (companyId: string, companiesData: Company[]) =>
  companiesData.find((company) => company.key === companyId);

const filterBySearchTerm = (
  jobOffers: JobOffer[],
  companiesData: Company[],
  term: string
) => {
  return jobOffers.filter(
    (jobOffer) =>
      (findCompanyByID(jobOffer.companyId, companiesData)?.companyName ?? "")
        .toLowerCase()
        .includes(term.toLowerCase()) ||
      jobOffer.jobTitle.toLowerCase().includes(term.toLowerCase())
  );
};

const locations = (jobOffers: JobOffer[]) =>
  Array.from(new Set(jobOffers.map((jobOffer) => jobOffer.location)));

const filterByFavorite = (jobOffers: JobOffer[], favoriteOffers: string[]) => {
  return jobOffers.filter((jobOffer) => favoriteOffers.includes(jobOffer.key));
};

const filterByLocation = (jobOffers: JobOffer[], location: string) => {
  return jobOffers.filter(
    ({ location: offersLocation }) => offersLocation === location
  );
};

export const JobBoard: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [jobOffers, setJobOffers] = useState<JobOffer[]>(jobOffersData);
  const [favoriteOffers, setFavoriteOffers] = useState<string[]>(
    localStorageFacade.getFavoriteJobOffers()
  );
  const [location, setLocation] = useState<string>("");
  const [filterFavoriteOn, setFilterFavoriteOn] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    setJobOffers(
      filterBySearchTerm(jobOffersData, companiesData, debouncedSearchTerm)
    );
  }, [debouncedSearchTerm]);
  useEffect(() => {
    if (filterFavoriteOn) {
      setJobOffers(filterByFavorite(jobOffersData, favoriteOffers));
    } else {
      setJobOffers(jobOffersData);
    }
  }, [filterFavoriteOn, favoriteOffers]);
  useEffect(() => {
    localStorageFacade.updateFavoriteJobOffers(favoriteOffers);
  }, [favoriteOffers]);
  useEffect(() => {
    if (location) {
      setJobOffers(filterByLocation(jobOffersData, location));
    } else {
      setJobOffers(jobOffersData);
    }
  }, [location]);
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
