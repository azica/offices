import { ArrowLeftIcon, GoogleCalendarIcon } from "@/assets/icons";

import styles from "./GoogleButton.module.scss";

const GoogleButton = () => {
  return (
    <button className={styles.googleButton}>
      <GoogleCalendarIcon />
      Перейти в Google Calendar
      <ArrowLeftIcon />
    </button>
  );
};

export default GoogleButton;
