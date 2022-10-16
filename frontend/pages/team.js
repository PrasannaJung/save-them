import React from "react";
import Team from "../components/Team";
import styles from "../styles/Team.module.css";

const TeamPage = () => {
  return (
    <>
      <h1 className={styles.heading}> Our Team </h1>

      <div class={styles.profiles}>
        <Team name='Prasanna' role='Frontend Developer' />
        <Team name='Rahul' role='UI/UX Designer' />
        <Team name='Saurabh' role='Backend Developer' />
      </div>
    </>
  );
};

export default TeamPage;
