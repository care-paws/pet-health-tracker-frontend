import PropTypes from "prop-types";
import styles from "./PageLayout.module.css";

function PageLayout({ className, header, footer, children }) {
  return (
    <div className={`${styles.pageLayout} ${className || ""}`.trim()}>
      {header}
      {children}
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
