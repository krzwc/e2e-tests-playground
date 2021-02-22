import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import type { JobOfferProps } from "components/job-offer-short";
import styles from "./styles.module.scss";

export const JobOfferExtended: FunctionComponent<JobOfferProps> = ({
  jobTitle,
  description,
  skills,
  markets,
}) => {
  return (
    <article className={styles.modal}>
      <section className={styles.modalInside}>
        <section className={styles.modalContentContainer}>
          <Link to="/" className={styles.crossLink}>
            <span className={styles.cross}>&times;</span>
          </Link>
          <div>{jobTitle}</div>
          <div>{description}</div>
          <div>
            {skills.map((skill, index) => (
              <div key={index}>{skill}</div>
            ))}
          </div>
          <div>
            {markets.map((market, index) => (
              <div key={index}>{market}</div>
            ))}
          </div>
        </section>
      </section>
    </article>
  );
};
