import PropTypes from "prop-types";
import styles from "./AppFooter.module.css";

function AppFooter({ className, children }) {
  return <footer className={`${styles.appFooter} ${className || ""}`.trim()}>{children}</footer>;
}

AppFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default AppFooter;
