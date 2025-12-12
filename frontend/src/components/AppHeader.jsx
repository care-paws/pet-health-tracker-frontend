import PropTypes from "prop-types";
import styles from "./AppHeader.module.css";

function AppHeader({ className, children, showBackButton = false, showMenuButton = false, onBackClick, onMenuClick }) {
  return (
    <header className={`${styles.appHeader} ${className || ""}`.trim()}>
      <div className={styles.appHeader__left}>
        {showBackButton && (
          <button type="button" className={styles.appHeader__backButton} onClick={onBackClick} aria-label="Back">
            ←
          </button>
        )}
      </div>
      <div className={styles.appHeader__center}>{children}</div>
      <div className={styles.appHeader__right}>
        {showMenuButton && (
          <button type="button" className={styles.appHeader__menuButton} onClick={onMenuClick} aria-label="Menu">
            ☰
          </button>
        )}
      </div>
    </header>
  );
}

AppHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  showBackButton: PropTypes.bool,
  showMenuButton: PropTypes.bool,
  onBackClick: PropTypes.func,
  onMenuClick: PropTypes.func,
};

export default AppHeader;
