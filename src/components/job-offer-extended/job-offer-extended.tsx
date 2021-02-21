import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const JobOfferExtended: FunctionComponent = () => {
  return (
    <article className={styles.modal}>
      <section className={styles.modalInside}>
        <section className={styles.modalContentContainer}>
          <Link to="/" className={styles.crossLink}>
            <span className={styles.cross}>&times;</span>
          </Link>
        </section>
      </section>
    </article>
  );
};
