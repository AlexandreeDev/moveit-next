import { useContext } from "react";

import { ChallengesContext } from "../contexts/ContextsChallenge";
import styles from "../styles/components/CompletedChallenges.module.css";

export function CompletedChallenges() {
  const { challengesCompleted } = useContext(ChallengesContext);

  return (
    <div className={styles.completedchallengesContainer}>
      <span>Desafios Completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}
