import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { homeIcon, pawIcon } from "@/assets/icons/icons";
import styles from "./AppFooter.module.css";

function AppFooter({ className, children }) {
  return (
    <footer className={`${styles.appFooter} ${className || ""}`.trim()}>
      {children}
      <nav className={styles.footerNav}>
        <Link to="/" className={styles.footerButton}>
          <img src={homeIcon} alt="Home" className={styles.footerIcon} />
          <span className={styles.footerLabel}>Inicio</span>
        </Link>
        <Link to="/create-pet" className={styles.footerButton}>
          <img src={pawIcon} alt="Pets" className={styles.footerIcon} />
          <span className={styles.footerLabel}>Mascotas</span>
        </Link>
      </nav>
    </footer>
  );
}

AppFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default AppFooter;
