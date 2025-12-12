import { homeIcon, pawIcon } from "@/assets/icons/icons";
import { getCurrentUser } from "@/services/authService";
import { getPets } from "@/services/petService";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AppFooter.module.css";

function AppFooter({ className, children }) {
  const [hasPets, setHasPets] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthAndPets = async () => {
      try {
        const authResult = await getCurrentUser();
        if (authResult.success && authResult.user) {
          setIsLoggedIn(true);
          // Check if user has pets
          try {
            const petsResult = await getPets();
            setHasPets(petsResult.pets && petsResult.pets.length > 0);
          } catch (err) {
            console.error("Error checking pets:", err);
            setHasPets(false);
          }
        } else {
          setIsLoggedIn(false);
          setHasPets(false);
        }
      } catch (err) {
        console.error("Error checking auth:", err);
        setIsLoggedIn(false);
        setHasPets(false);
      }
    };
    checkAuthAndPets();
  }, []);

  return (
    <footer className={`${styles.appFooter} ${className || ""}`.trim()}>
      {children}
      <nav className={styles.footerNav}>
        <Link to="/" className={styles.footerButton}>
          <img src={homeIcon} alt="Home" className={styles.footerIcon} />
          <span className={styles.footerLabel}>Inicio</span>
        </Link>
        {isLoggedIn && (
          <Link to={hasPets ? "/pets" : "/create-pet"} className={styles.footerButton}>
            <img src={pawIcon} alt="Pets" className={styles.footerIcon} />
            <span className={styles.footerLabel}>Mascotas</span>
          </Link>
        )}
      </nav>
    </footer>
  );
}

AppFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default AppFooter;
