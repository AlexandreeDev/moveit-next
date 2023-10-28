import { useContext } from "react";

import { ChallengesContext } from "../contexts/ContextsChallenge";
import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/alexandreedev.png" />
      <div>
        <strong>Alexandre Jorge</strong>
        <p>
          <img src="icons/level.svg" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
