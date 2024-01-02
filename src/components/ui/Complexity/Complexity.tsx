import type { FC } from "react";

import { ComplexityIcon, ComplexityIcon1, ComplexityIcon2, ComplexityIcon3 } from "@/assets/icons";

import styles from "./Complexity.module.scss";

const Complexity: FC<{ actionType: Model.ActionType }> = ({ actionType }) => {
  let complexityIcon;

  switch (actionType.value) {
    case "notSelected":
      complexityIcon = <ComplexityIcon />;
      break;
    case "type_1":
      complexityIcon = <ComplexityIcon1 />;
      break;
    case "type_2":
      complexityIcon = <ComplexityIcon2 />;
      break;
    case "type_3":
      complexityIcon = <ComplexityIcon3 />;
      break;
    default:
      complexityIcon = null;
      break;
  }

  return (
    <div className={`${styles.complexity} ${styles[actionType.value]}`}>
      {complexityIcon} {actionType.name}
    </div>
  );
};

export default Complexity;
