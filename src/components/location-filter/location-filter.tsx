import { FunctionComponent } from "react";
import { Menu, Dropdown, Button } from "antd";
import { MenuClickEventHandler } from "rc-menu/lib/interface";
import { DownOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";

export const LocationFilter: FunctionComponent<{
  locations: string[];
  onChange: (location: string) => void;
}> = ({ locations, onChange }) => {
  const handleMenuClick: MenuClickEventHandler = ({ key }) => {
    onChange(locations[Number(key)]);
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      {locations.map((location, index) => (
        <Menu.Item key={index}>{location}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Button className={styles.locationFilter}>
        Location <DownOutlined />
      </Button>
    </Dropdown>
  );
};
