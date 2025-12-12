import { logout } from "@/services/authService";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AppHeader.module.css";

function AppHeader({
  className,
  children,
  showBackButton = false,
  showMenuButton = false,
  onBackClick,
  onMenuClick,
  backPosition = "left",
  centerAlign = "center",
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if we should show the menu options based on current route
  const shouldShowMenuOptions = !["/", "/login", "/register"].includes(location.pathname);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleMenuButtonClick = () => {
    if (onMenuClick) {
      onMenuClick();
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const handleViewPets = () => {
    setIsMenuOpen(false);
    navigate("/pets");
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Still redirect to login even if logout fails
      navigate("/login");
    }
  };

  return (
    <header className={`${styles.appHeader} ${className || ""}`.trim()}>
      <div className={styles.appHeader__left}>{backPosition === "left" && showBackButton && backButton(onBackClick)}</div>
      <div
        className={`${styles.appHeader__center} ${
          centerAlign === "start" ? styles.appHeader__centerStart : centerAlign === "end" ? styles.appHeader__centerEnd : ""
        }`.trim()}
      >
        {children}
      </div>
      <div className={styles.appHeader__right}>
        {backPosition === "right" && showBackButton && backButton(onBackClick)}
        {showMenuButton && (
          <div className={styles.appHeader__menuContainer} ref={menuRef}>
            <button type="button" className={styles.appHeader__menuButton} onClick={handleMenuButtonClick} aria-label="Menu">
              ☰
            </button>
            {isMenuOpen && shouldShowMenuOptions && (
              <div className={styles.appHeader__dropdown}>
                <button type="button" className={styles.appHeader__dropdownItem} onClick={handleViewPets}>
                  🐾 Ver mascotas
                </button>
                <button type="button" className={styles.appHeader__dropdownItem} onClick={handleLogout}>
                  🚪 Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

function backButton(onBackClick) {
  return (
    <button type="button" className={styles.appHeader__backButton} onClick={onBackClick} aria-label="Back">
      ←
    </button>
  );
}

AppHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  showBackButton: PropTypes.bool,
  showMenuButton: PropTypes.bool,
  onBackClick: PropTypes.func,
  onMenuClick: PropTypes.func,
  backPosition: PropTypes.oneOf(["left", "right"]),
  centerAlign: PropTypes.oneOf(["center", "start", "end"]),
};

export default AppHeader;
