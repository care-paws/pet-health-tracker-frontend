import PropTypes from "prop-types";
import styles from "./PageLayout.module.css";

function PageLayout({ className, header, footer, children }) {
  return (
    <div className={`${styles.pageLayout} ${className || ""}`.trim()}>
      {header && <div className={styles.pageLayout__header}>{header}</div>}
      <div className={styles.pageLayout__content}>{children}</div>
      {footer}
    </div>
  );
}

PageLayout.propTypes = {
  className: PropTypes.string,
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node,
};

export default PageLayout;
