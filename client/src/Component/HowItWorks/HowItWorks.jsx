import React from "react";
import styles from "./howitworks.module.css";

const HowItWorks = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>How Evangadi Forum Works</h1>
      <div className={styles.steps}>
        <div className={styles.featureBox}>
          <h2>🧑‍💻 Register</h2>
          <ul>
            <li>Click the Register button.</li>
            <li>Fill in your personal details.</li>
            <li>Submit the form to create your account.</li>
            <li>You’ll be redirected to the login screen.</li>
          </ul>
        </div>

        <div className={styles.featureBox}>
          <h2>🔐 Login</h2>
          <ul>
            <li>Click the Login button.</li>
            <li>Enter your email and password.</li>
            <li>Use the eye icon to toggle password visibility if needed.</li>
            <li>Submit to access your dashboard.</li>
          </ul>
        </div>

        <div className={styles.featureBox}>
          <h2>❓ Ask a Question</h2>
          <ul>
            <li>Go to the Ask Question page.</li>
            <li>Enter a title and detailed description.</li>
            <li>Submit to post your question publicly.</li>
          </ul>
        </div>

        <div className={styles.featureBox}>
          <h2>💬 Post an Answer</h2>
          <ul>
            <li>Select a question you're interested in.</li>
            <li>Write your answer in the provided box.</li>
            <li>Click Post to submit your answer.</li>
          </ul>
        </div>

        <div className={styles.featureBox}>
          <h2>🔎 Search Forum</h2>
          <ul>
            <li>Use the search bar to look for questions or answers.</li>
            <li>Click a result to explore related posts.</li>
          </ul>
        </div>

        <div className={styles.featureBox}>
          <h2>🚪 Logout</h2>
          <ul>
            <li>Click the Logout button in the header.</li>
            <li>You will be safely redirected to the login page.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
