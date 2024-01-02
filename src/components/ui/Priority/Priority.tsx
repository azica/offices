import styles from "./Priority.module.scss";

const Priority = ({ priority }: { priority: number }) => {
  let priorityText;

  switch (priority) {
    case 3:
      priorityText = "низкий";
      break;
    case 2:
      priorityText = "Средний";
      break;
    case 1:
      priorityText = "высокий";
      break;
    default:
      priorityText = null;
      break;
  }

  return (
    <div className={`${styles.priority} ${styles[`priority_${priority}`]}`}>
      <span></span> {priorityText}
    </div>
  );
};

export default Priority;
