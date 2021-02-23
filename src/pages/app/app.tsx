import { FunctionComponent } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { JobBoard } from "components/job-board";
import styles from "./styles.module.scss";
import "antd/dist/antd.css";
import "./antd-overrides.scss";

export const App: FunctionComponent = () => {
  return (
    <Router>
      <div className={styles.app}>
        <JobBoard />
      </div>
    </Router>
  );
};
