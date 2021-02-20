import { FunctionComponent, useState, useEffect } from "react";
import { JobOfferShort } from "../job-offer-short";
import useDebounce from "hooks/use-debounce";
import { JobOffer, Company } from "common/interfaces";
import { Input } from "../input";
import { jobOffersData, companiesData } from "common/data";
import { localStorageFacade } from "common/helpers";

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

export const JobBoard: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [jobOffers, setJobOffers] = useState<JobOffer[]>(jobOffersData);
  const [favoriteOffers, setFavoriteOffers] = useState<string[]>(
    localStorageFacade.getFavoriteJobOffers()
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    setJobOffers(
      filterBySearchTerm(jobOffersData, companiesData, debouncedSearchTerm)
    );
  }, [debouncedSearchTerm]);
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);
  return (
    <article>
      <Input onChange={onChangeHandler} />
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
