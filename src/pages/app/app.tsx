import { FunctionComponent } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { JobBoard } from "components/job-board";
import styles from "./styles.module.scss";
import "antd/dist/antd.css";
import "./antd-overrides.scss";

import { jobOffersData, companiesData } from "common/data";
import {
  assertExpectedArrayShape,
  isCompanyArr,
  isJobOfferArr,
} from "./runtime-type-guards";

export const App: FunctionComponent = () => {
  if (jobOffersData && companiesData) {
    assertExpectedArrayShape(jobOffersData, isJobOfferArr);
    assertExpectedArrayShape(companiesData, isCompanyArr);
  }
  return (
    <Router>
      <div className={styles.app}>
        <JobBoard jobOffersData={jobOffersData} companiesData={companiesData} />
      </div>
    </Router>
  );
};
