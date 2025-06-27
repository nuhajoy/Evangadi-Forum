
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./about.module.css";


function About() {
  const navigate = useNavigate();
  return (
    <div className={styles.aboutSection}>
      <h1>About</h1>
      <h2>Evangadi Networks</h2>
      <p>
        No matter what stage of life you are in, whether you’re just starting
        elementary school or being promoted to CEO of a Fortune 500 company, you
        have much to offer to those who are trying to follow in your footsteps.
      </p>
      <p>
        Whether you are willing to share your knowledge or you are just looking
        to meet mentors of your own, please start by joining the network here.
      </p>
      
      <button className={styles.howItWorksBtn} onClick={() => navigate("/how-it-works")}>
        How it Works
      </button>
    </div>
  );
}

export default About;
