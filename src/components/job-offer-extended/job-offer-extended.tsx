import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import type { JobOfferProps } from "components/job-offer-short";
import styles from "./styles.module.scss";

export const JobOfferExtended: FunctionComponent<JobOfferProps> = ({
  jobTitle,
  description,
  skills,
  companyName,
  logotype,
  about,
}) => {
  return (
    <article className={styles.modal}>
      <section className={styles.modalInside}>
        <section className={styles.modalContentContainer}>
          <Link to="/" className={styles.crossLink}>
            <span className={styles.cross}>&times;</span>
          </Link>
          <header>
            <div className={styles.companyLogo}>
              <img
                alt={`${companyName} logo`}
                src={require(`../../${logotype}`).default}
              />
            </div>
            <h3 className={styles.heading}>{jobTitle}</h3>
          </header>
          <div>{description}</div>
          <div>
            <h4 className={styles.subheading}>Expected</h4>
            {skills.map((skill, index) => (
              <Tag key={index}>{skill}</Tag>
            ))}
          </div>
          <div>
            <h4 className={styles.subheading}>About {companyName}</h4>
            {about}
          </div>
        </section>
      </section>
    </article>
  );
};
