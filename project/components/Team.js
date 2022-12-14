import React from "react";
import styles from "../styles/Team.module.css";

const Team = ({ name, role, url, socialLink }) => {
  return (
    <>
      <div class={`${styles.profile} ${styles["border__gradient"]}`}>
        <img class={styles.profileImage} src={url} />
        <div class={styles.profileContent}>
          <h2>{name}</h2>
          <p>{role}</p>
        </div>
        <div class={styles.contact}>
          <a href={socialLink} target='_blank' class={styles.contactBtn}>
            Connect With Me!
          </a>
        </div>
      </div>
    </>
  );
};

export default Team;
