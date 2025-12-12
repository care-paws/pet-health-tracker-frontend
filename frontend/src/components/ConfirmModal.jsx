import PropTypes from "prop-types";
import styles from "./ConfirmModal.module.css";

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirmar", cancelText = "Cancelar" }) {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.modalOverlay} onClick={onCancel} />
      <div className={styles.modal}>
        <h2 className={styles.modal__title}>{title}</h2>
        <p className={styles.modal__message}>{message}</p>
        <div className={styles.modal__actions}>
          <button type="button" onClick={onCancel} className={styles.modal__cancelButton}>
            {cancelText}
          </button>
          <button type="button" onClick={onConfirm} className={styles.modal__confirmButton}>
            {confirmText}
          </button>
        </div>
      </div>
    </>
  );
}

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default ConfirmModal;

