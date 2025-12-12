import PropTypes from "prop-types";
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
          <button type="button" className={styles.appHeader__menuButton} onClick={onMenuClick} aria-label="Menu">
            ☰
          </button>
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
