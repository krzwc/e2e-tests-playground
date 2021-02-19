import { FunctionComponent, useState, useEffect } from "react";
import { JobOfferShort } from "./job-offer-short";
import useDebounce from "../hooks/use-debounce";
import { LOCATION, JobOffer } from "./interfaces";

const data: JobOffer[] = [
  {
    key: "1",
    jobTitle: "Frontend developer",
    companyName: "Taikai",
    description: "Develop fronetnd applications",
    skills: ["react", "js", "git"],
    markets: ["it", "startup"],
    jobType: "onsite",
    location: LOCATION.earth,
  },
  {
    key: "2",
    jobTitle: "Frontend developer",
    companyName: "Taikai",
    description: "Develop fronetnd applications",
    skills: ["react", "js", "git"],
    markets: ["it", "startup"],
    jobType: "onsite",
    location: LOCATION.earth,
  },
  {
    key: "3",
    jobTitle: "Frontend developer",
    companyName: "Taikai",
    description: "Develop fronetnd applications",
    skills: ["react", "js", "git"],
    markets: ["it", "startup"],
    jobType: "onsite",
    location: LOCATION.earth,
  },
  {
    key: "4",
    jobTitle: "Frontend developer",
    companyName: "Taikai",
    description: "Develop fronetnd applications",
    skills: ["react", "js", "git"],
    markets: ["it", "startup"],
    jobType: "onsite",
    location: LOCATION.earth,
  },
  {
    key: "5",
    jobTitle: "Frontend developer",
    companyName: "Taikai",
    description: "Develop fronetnd applications",
    skills: ["react", "js", "git"],
    markets: ["it", "startup"],
    jobType: "onsite",
    location: LOCATION.earth,
  },
  {
    key: "6",
    jobTitle: "Frontend developer",
    companyName: "Taikai",
    description: "Develop fronetnd applications",
    skills: ["react", "js", "git"],
    markets: ["it", "startup"],
    jobType: "onsite",
    location: LOCATION.earth,
  },
];

const filterBySearchTerm = (dajobOffers: JobOffer[], term: string) => {
  return dajobOffers.filter(
    (jobOffer) =>
      jobOffer.companyName.toLowerCase().includes(term.toLowerCase()) ||
      jobOffer.jobTitle.toLowerCase().includes(term.toLowerCase())
  );
};

export const JobBoard: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobOffers, setJobOffers] = useState(data);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    setJobOffers(filterBySearchTerm(data, debouncedSearchTerm));
  }, [debouncedSearchTerm]);
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);
  return (
    <article>
      <input onChange={onChangeHandler} />
      {jobOffers.map((offer) => (
        <JobOfferShort {...offer} />
      ))}
    </article>
  );
};
