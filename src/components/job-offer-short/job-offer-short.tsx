import { FunctionComponent } from "react";
import type { JobOffer } from "../interfaces";
import styles from "./styles.module.scss";

export const JobOfferShort: FunctionComponent<JobOffer> = ({
  jobTitle,
  companyName,
  skills,
  markets,
  jobType,
  location,
}) => {
  return (
    <section className={styles.jobOfferShort}>
      <div>{jobTitle}</div>
      <div>{companyName}</div>
      <div>
        {skills.map((skill, index) => (
          <span key={index}>{skill}</span>
        ))}
      </div>
      <div>
        {markets.map((market, index) => (
          <span key={index}>{market}</span>
        ))}
      </div>
      <div>{jobType}</div>
      <div>{location}</div>
    </section>
  );
};
