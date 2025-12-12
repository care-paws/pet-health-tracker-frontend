import PropTypes from "prop-types";
import styles from "./ErrorModal.module.css";

function ErrorModal({ isOpen, title = "Error", message, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.modal__icon}>⚠️</div>
        <h2 className={styles.modal__title}>{title}</h2>
        <p className={styles.modal__message}>{message}</p>
        <button type="button" onClick={onClose} className={styles.modal__button}>
          Entendido
        </button>
      </div>
    </>
  );
}

ErrorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ErrorModal;

