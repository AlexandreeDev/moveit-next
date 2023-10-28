import { createContext, useState, ReactNode, useEffect } from "react";

import Cookies from "js-cookie";

import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";

interface Challenge {
  type: "body" | "eye" | string;
  description: string;
  amount: number;
}
type Ichallenge = Challenge | null;

interface ChallengesContextData {
  challengesCompleted: number;
  currentExperience: number;
  experienceToNextLevel: number;
  level: number;
  activeChallenge: Ichallenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengerProviderProps {
  children: ReactNode;
  challengesCompleted: number;
  currentExperience: number;
  level: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengerProvider({
  children,
  ...rest
}: ChallengerProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setcurrentExperience] = useState(
    rest.currentExperience ?? 0,
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0,
  );
  const [activeChallenge, setActiveChallenge] = useState<Ichallenge>(null);

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("challengesCompleted", String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio", {
        body: `Valendo ${challenge.amount}xp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setcurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        activeChallenge,
        challengesCompleted,
        closeLevelUpModal,
        completeChallenge,
        currentExperience,
        experienceToNextLevel,
        level,
        levelUp,
        resetChallenge,
        startNewChallenge,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
