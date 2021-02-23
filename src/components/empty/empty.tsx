import { FunctionComponent } from "react";
import { Empty as AntdEmpty } from "antd";
import styles from "./styles.module.scss";

export const Empty: FunctionComponent<{
  requestFailure?: boolean;
  description?: string;
}> = ({ description: customDescription, requestFailure = false }) => {
  const failedDescription = requestFailure ? "Request Failure" : "No data";
  const description = customDescription || failedDescription;
  return (
    <div className={styles.emptyWrapper}>
      <AntdEmpty
        image={AntdEmpty.PRESENTED_IMAGE_SIMPLE}
        description={description}
      />
    </div>
  );
};
