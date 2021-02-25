import { FunctionComponent } from "react";
import { Menu, Dropdown, Button } from "antd";
import { MenuClickEventHandler } from "rc-menu/lib/interface";
import { DownOutlined } from "@ant-design/icons";
import { classNames } from "common/helpers";
import { LOCATION } from "common/interfaces";
import styles from "./styles.module.scss";

export const LocationFilter: FunctionComponent<{
  locations: string[];
  location: string;
  onChange: (location: string) => void;
}> = ({ locations, onChange, location }) => {
  const handleMenuClick: MenuClickEventHandler = ({ key }) => {
    onChange(locations[Number(key)]);
  };
  const isLocationSet = location !== "" && location !== LOCATION.all;
  const menu = (
    <Menu onClick={handleMenuClick}>
      {locations.map((location, index) => (
        <Menu.Item key={index}>{location}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Button
        className={classNames(
          styles.locationFilter,
          isLocationSet ? styles.filterOn : ""
        )}
        data-cy="location-filter"
      >
        {isLocationSet ? location : "Location"} <DownOutlined />
      </Button>
    </Dropdown>
  );
};
