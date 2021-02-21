import { JobBoard } from "components/job-board";
import { FunctionComponent } from "react";
import styles from "./styles.module.scss";
import "antd/dist/antd.css";
import "./antd-overrides.scss";

export const App: FunctionComponent = () => {
  return (
    <div className={styles.app}>
      <h3>Interplanetary job postings</h3>
      <JobBoard />
    </div>
  );
};
