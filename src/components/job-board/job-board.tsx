import { FunctionComponent, useState, useEffect } from "react";
import { compose, identity } from "ramda";
import { Switch, Route } from "react-router-dom";
import { JobOfferShort } from "components/job-offer-short";
import { JobOfferExtended } from "components/job-offer-extended";
import { FavoriteOffersFilter } from "components/favorite-offers-filter";
import { LocationFilter } from "components/location-filter";
import { SkillFilter } from "components/skill-filter";
import { useDebounce } from "hooks/use-debounce";
import type { Company, JobOffer } from "common/interfaces";
import { Input } from "components/input";
import { Empty } from "components/empty";
import { localStorageFacade, isNotEmpty } from "common/helpers";
import {
  findCompanyByID,
  filterByFavorite,
  filterByLocation,
  filterBySearchTerm,
  filterBySkills,
  locations,
  allSkills,
} from "./helpers";
import styles from "./styles.module.scss";

export const JobBoard: FunctionComponent<{
  jobOffersData: JobOffer[];
  companiesData: Company[];
}> = ({ jobOffersData, companiesData }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [jobOffers, setJobOffers] = useState<JobOffer[]>(jobOffersData);
  const [favoriteOffers, setFavoriteOffers] = useState<string[]>(
    localStorageFacade.getFavoriteJobOffers()
  );
  const [location, setLocation] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [filterFavoriteOn, setFilterFavoriteOn] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);
  const filterBySearchTermFunction =
    debouncedSearchTerm !== "" ? filterBySearchTerm : identity;
  const filterByFavoriteFunction = filterFavoriteOn
    ? filterByFavorite
    : identity;
  const filterByLocationFunction =
    location !== "" ? filterByLocation : identity;
  const filterBySkillsFunction = selectedSkills.length
    ? filterBySkills
    : identity;
  useEffect(() => {
    setJobOffers(
      compose(
        filterBySearchTermFunction,
        filterByFavoriteFunction,
        filterByLocationFunction,
        filterBySkillsFunction
      )({
        jobOffers: jobOffersData,
        companiesData,
        term: debouncedSearchTerm,
        favoriteOffers,
        location,
        skills: selectedSkills,
      }).jobOffers
    );
  }, [
    filterBySearchTermFunction,
    filterByFavoriteFunction,
    filterByLocationFunction,
    filterBySkillsFunction,
    debouncedSearchTerm,
    filterFavoriteOn,
    favoriteOffers,
    location,
    selectedSkills,
    jobOffersData,
    companiesData,
  ]);
  useEffect(() => {
    localStorageFacade.updateFavoriteJobOffers(favoriteOffers);
  }, [favoriteOffers]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  return (
    <article className={styles.jobBoard}>
      <header className={styles.header}>
        <h3 className={styles.heading}>Interplanetary job postings</h3>
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
          <SkillFilter
            allSkills={allSkills(jobOffersData)}
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
          />
        </div>
      </header>
      <section className={styles.shortOffersContainer}>
        {jobOffers.map((offer) => {
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
      </section>
      <Switch>
        {isNotEmpty(jobOffers) ? (
          jobOffers.map((offer) => {
            const companyData = findCompanyByID(offer.companyId, companiesData);
            return (
              <Route path={`/${offer.key}`} key={offer.key}>
                {
                  <JobOfferExtended
                    {...offer}
                    offerKey={offer.key}
                    companyName={companyData?.companyName}
                    logotype={companyData?.logotype}
                    about={companyData?.about}
                    favoriteOffers={favoriteOffers}
                    setFavoriteOffers={setFavoriteOffers}
                  />
                }
              </Route>
            );
          })
        ) : (
          <Empty description="No offers matching the criteria" />
        )}
      </Switch>
    </article>
  );
};
