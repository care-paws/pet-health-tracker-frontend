import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./AddReminderModal.module.css";

// Create a default file to send to the backend (required by API)
// Create a minimal valid 1x1 transparent PNG image
const createDefaultFile = () => {
  // Minimal 1x1 transparent PNG in base64
  const base64PNG = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  const binaryString = atob(base64PNG);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: "image/png" });
  return new File([blob], "pet-dog.png", { type: "image/png" });
};

function AddReminderModal({ isOpen, onClose, onSave, loading, error }) {
  const [formData, setFormData] = useState({
    eventType: "",
    description: "",
    eventDate: "",
    attachment: createDefaultFile(), // Always include default file
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Ensure attachment is always present
    const dataToSend = {
      ...formData,
      attachment: formData.attachment || createDefaultFile(),
    };
    onSave(dataToSend);
    setFormData({
      eventType: "",
      description: "",
      eventDate: "",
      attachment: createDefaultFile(),
    });
  };

  const handleCancel = () => {
    setFormData({
      eventType: "",
      description: "",
      eventDate: "",
      attachment: createDefaultFile(),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.modalOverlay} onClick={handleCancel} />
      <div className={styles.modal}>
        <h2 className={styles.modal__title}>Agregar recordatorio</h2>

        {error && <div className={styles.modal__error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.modal__form}>
          <div className={styles.modal__field}>
            <label htmlFor="eventType" className={styles.modal__label}>
              Tipo de evento <span className={styles.modal__required}>*</span>
            </label>
            <select id="eventType" name="eventType" value={formData.eventType} onChange={handleChange} className={styles.modal__input} required>
              <option value="">Seleccionar tipo</option>
              <option value="VACCINE">Vacuna</option>
              <option value="VET_VISIT">Visita veterinaria</option>
              <option value="FEEDING">Alimentación</option>
            </select>
          </div>

          <div className={styles.modal__field}>
            <label htmlFor="description" className={styles.modal__label}>
              Agregar una descripcion <span className={styles.modal__required}>*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="agregar una descripcion"
              className={styles.modal__textarea}
              rows={3}
              required
            />
          </div>

          <div className={styles.modal__field}>
            <label htmlFor="eventDate" className={styles.modal__label}>
              Fecha del evento <span className={styles.modal__required}>*</span>
            </label>
            <input
              type="datetime-local"
              id="eventDate"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className={styles.modal__input}
              required
            />
          </div>

          <div className={styles.modal__actions}>
            <button type="button" onClick={handleCancel} className={styles.modal__cancelButton} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className={styles.modal__saveButton} disabled={loading}>
              {loading ? "Guardando..." : "💾 Guardar"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

AddReminderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default AddReminderModal;
