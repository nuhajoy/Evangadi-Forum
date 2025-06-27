import React from "react";
import styles from "./footer.module.css";
import log from "../../Resource/img/footlogo.png";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <img src={log} alt="Evangadi Logo" className={styles.logo} />
        <div className={styles.socials}>
          <a
            href="https://web.facebook.com/evangaditech/?_rdc=1&_rdr#"
            target="_blank"
          >
            <FaFacebook size={24} color="#ffff" />
          </a>
          <a
            href="https://www.instagram.com/evangaditech/?hl=en"
            target="_blank"
          >
            <FaInstagram size={24} color="#ffff" />
          </a>
          <a href="https://www.youtube.com/evangaditech" target="_blank">
            <FaYoutube size={24} color="#ffff" />
          </a>
        </div>
      </div>
      <div className={styles.center}>
        <h4>Useful Link</h4>
        <a href="/how-it-works">How it works</a>
        <a href="https://evangadi.com/legal/terms">Terms of Service</a>
        <a href="https://evangadi.com/legal/privacy">Privacy policy</a>
      </div>
      <div className={styles.right}>
        <h4>Contact Info</h4>
        <p>Evangadi Networks</p>
        <p>support@evangadi.com</p>
        <p>+1-202-386-2702</p>
      </div>
    </footer>
  );
};

export default Footer;
