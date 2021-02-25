import { FunctionComponent } from "react";
import { Select, SelectProps } from "antd";
import styles from "./styles.module.scss";

export const SkillFilter: FunctionComponent<{
  allSkills: string[];
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
}> = ({ allSkills, selectedSkills, setSelectedSkills }) => {
  const options: {
    label: string;
    value: string;
  }[] = allSkills.map((skill) => ({ label: skill, value: skill }));
  const selectProps: SelectProps<string[]> = {
    mode: "multiple",
    value: selectedSkills,
    options,
    onChange: (newValue) => {
      setSelectedSkills(newValue);
    },
    placeholder: "Select skills...",
    dropdownMatchSelectWidth: true,
  };
  return (
    <Select
      {...selectProps}
      className={styles.skillFilter}
      data-cy="skill-filter"
    />
  );
};
