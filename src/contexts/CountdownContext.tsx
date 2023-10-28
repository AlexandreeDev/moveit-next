import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

import { ChallengesContext } from "./ContextsChallenge";

interface CountdownContextData {
  hasFinished: boolean;
  isActive: boolean;
  minutes: number;
  resetCountdown: () => void;
  seconds: number;
  startCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countDownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(45 * 60);
  const [isActive, setisActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setisActive(true);
  }

  function resetCountdown() {
    clearTimeout(countDownTimeout);
    setisActive(false);
    setTime(45 * 60);
    setHasFinished(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setisActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);
  return (
    <CountdownContext.Provider
      value={{
        hasFinished,
        isActive,
        minutes,
        resetCountdown,
        seconds,
        startCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
