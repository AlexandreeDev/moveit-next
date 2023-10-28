import { GetServerSideProps } from "next";
import Head from "next/head";

import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengerProvider } from "../contexts/ContextsChallenge";
import { CountdownProvider } from "../contexts/CountdownContext";
import styles from "../styles/pages/Home.module.css";

interface HomeProps {
  challengesCompleted: number;
  currentExperience: number;
  level: number;
}

export default function Home(props: HomeProps) {
  console.log(props);
  return (
    <ChallengerProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | Moveit</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengerProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      challengesCompleted: Number(challengesCompleted),
      currentExperience: Number(currentExperience),
      level: Number(level),
    },
  };
};
