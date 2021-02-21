import { JobOffer, Company, LOCATION } from "common/interfaces";

interface Filter {
  jobOffers: JobOffer[];
  companiesData?: Company[];
  term?: string;
  favoriteOffers?: string[];
  location?: string;
}

export const findCompanyByID = (companyId: string, companiesData: Company[]) =>
  companiesData.find((company) => company.key === companyId);

export const filterBySearchTerm = (filterData: Filter): Filter => {
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

export const locations = (jobOffers: JobOffer[]): LOCATION[] => [
  LOCATION.all,
  ...Array.from(new Set(jobOffers.map((jobOffer) => jobOffer.location))),
];

export const filterByFavorite = (filterData: Filter): Filter => {
  const { jobOffers, favoriteOffers = [] } = filterData;
  return {
    ...filterData,
    jobOffers: jobOffers.filter((jobOffer) =>
      favoriteOffers.includes(jobOffer.key)
    ),
  };
};

export const filterByLocation = (filterData: Filter): Filter => {
  const { jobOffers, location } = filterData;
  return {
    ...filterData,
    jobOffers:
      location === LOCATION.all
        ? jobOffers
        : jobOffers.filter(
            ({ location: offerLocation }) => offerLocation === location
          ),
  };
};
