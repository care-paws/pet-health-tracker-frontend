import { bellIcon, reminderCardIcon } from "@/assets/icons/icons";
import logoUrl from "@/assets/logo.svg";
import AddReminderModal from "@/components/AddReminderModal";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import ConfirmModal from "@/components/ConfirmModal";
import ErrorModal from "@/components/ErrorModal";
import PageLayout from "@/layouts/PageLayout";
import { createEvent, getPetEvents } from "@/services/eventService";
import { createReminder, deleteReminder, getEventReminders } from "@/services/reminderService";
import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styles from "./RemindersPage.module.css";

function RemindersPage() {
  const [searchParams] = useSearchParams();
  const petId = searchParams.get("petId");

  const [vaccinesEnabled, setVaccinesEnabled] = useState(false);
  const [vetsEnabled, setVetsEnabled] = useState(false);
  const [foodEnabled, setFoodEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reminders, setReminders] = useState([]); // Changed from events to reminders
  const [loadingReminders, setLoadingReminders] = useState(true); // Changed from loadingEvents
  const [eventsByType, setEventsByType] = useState({}); // Store events by type for lookup

  // Confirm and error modals
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, reminderId: null });
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });

  const loadReminders = useCallback(async () => {
    if (!petId) return;

    try {
      setLoadingReminders(true);
      setError(null);

      // First, get all events for this pet
      const eventsResult = await getPetEvents(petId);
      const events = eventsResult.events || [];

      // Store events by type for later use
      const eventsMap = {};
      events.forEach(event => {
        eventsMap[event.type] = event;
      });
      setEventsByType(eventsMap);

      // Then, get all reminders for each event
      const allReminders = [];
      for (const event of events) {
        try {
          const remindersResult = await getEventReminders(event.id);
          const eventReminders = remindersResult.reminders || [];

          // Add event info to each reminder for display
          eventReminders.forEach(reminder => {
            allReminders.push({
              ...reminder,
              eventType: event.type,
              eventDescription: event.description,
            });
          });
        } catch (err) {
          console.error(`Error fetching reminders for event ${event.id}:`, err);
        }
      }

      setReminders(allReminders);
    } catch (err) {
      console.error("Error fetching reminders:", err);
      setError(err.message || "Error al cargar los recordatorios");
      setReminders([]);
    } finally {
      setLoadingReminders(false);
    }
  }, [petId]);

  useEffect(() => {
    if (!petId) {
      setError("No se especificó una mascota");
      setLoadingReminders(false);
      return;
    }
    loadReminders();
  }, [petId, loadReminders]);

  const handleOpenModal = () => {
    if (!petId) {
      setError("No se puede agregar recordatorio sin una mascota");
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError(null);
  };

  const handleSaveReminder = async formData => {
    if (!petId) {
      setError("No se especificó una mascota");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const eventDate = new Date(formData.eventDate).toISOString();

      // Check if an event of this type already exists
      let eventId;
      if (eventsByType[formData.eventType]) {
        // Use existing event
        eventId = eventsByType[formData.eventType].id;
      } else {
        // Create new event for this type
        const eventResult = await createEvent(petId, {
          date: eventDate,
          description: `Recordatorio de ${formData.eventType}`,
          type: formData.eventType,
          attachmentUrl: formData.attachment,
        });

        if (!eventResult.success || !eventResult.event) {
          throw new Error("Error al crear evento");
        }
        eventId = eventResult.event.id;
      }

      // Create reminder for the event
      const reminderResult = await createReminder({
        eventId: eventId,
        triggerTime: eventDate,
        description: formData.description,
      });

      if (reminderResult.success) {
        setIsModalOpen(false);
        // Refresh reminders list
        await loadReminders();
      }
    } catch (err) {
      console.error("Error saving reminder:", err);
      setError(err.message || "Error al guardar recordatorio");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReminder = reminderId => {
    if (!petId) return;
    setConfirmModal({ isOpen: true, reminderId });
  };

  const handleConfirmDelete = async () => {
    const reminderId = confirmModal.reminderId;
    setConfirmModal({ isOpen: false, reminderId: null });

    if (!reminderId || !petId) return;

    try {
      setLoadingReminders(true);
      // Delete only the specific reminder (not the event)
      await deleteReminder(reminderId);

      // Reload reminders list
      await loadReminders();
    } catch (err) {
      console.error("Error deleting reminder:", err);
      setErrorModal({
        isOpen: true,
        message: err.message || "Error al eliminar recordatorio",
      });
      setLoadingReminders(false);
    }
  };

  const handleCancelDelete = () => {
    setConfirmModal({ isOpen: false, eventId: null });
  };

  const handleCloseErrorModal = () => {
    setErrorModal({ isOpen: false, message: "" });
  };

  const header = (
    <div className={styles["remindersPage__headerWrap"]}>
      <AppHeader className={styles["remindersPage__header"]} showBackButton={false} showMenuButton={true} centerAlign="start">
        <Link to="/">
          <img src={logoUrl} alt="Care Paws" width={110} height={70} />
        </Link>
      </AppHeader>
    </div>
  );

  const footer = <AppFooter />;

  return (
    <PageLayout className={styles["remindersPage"]} header={header} footer={footer}>
      <AddReminderModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveReminder} loading={loading} error={error} />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title="Eliminar recordatorio"
        message="¿Estás seguro de que deseas eliminar este recordatorio? Esta acción no se puede deshacer."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />

      <ErrorModal isOpen={errorModal.isOpen} message={errorModal.message} onClose={handleCloseErrorModal} />

      <main className={styles["remindersPage__main"]}>
        {/* Page Title */}
        <div className={styles["pageTitle"]}>
          <img src={reminderCardIcon} alt="Recordatorios" className={styles["pageTitle__icon"]} />
          <h1 className={styles["pageTitle__text"]}>Recordatorios</h1>
        </div>

        {/* Schedule Section */}
        <div className={styles["scheduleSection"]}>
          {/* Loading State */}
          {loadingReminders && (
            <div className={styles["loadingState"]}>
              <p>Cargando recordatorios...</p>
            </div>
          )}

          {/* Reminders List */}
          {!loadingReminders && reminders.length > 0 && (
            <div className={styles["remindersList"]}>
              {reminders.map(reminder => {
                const triggerDate = new Date(reminder.triggerTime);
                const triggerTime = triggerDate.toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                const triggerDateFormatted = triggerDate.toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });
                const eventTypeLabel =
                  {
                    VACCINE: "Vacuna",
                    VET_VISIT: "Visita veterinaria",
                    FEEDING: "Alimentación",
                  }[reminder.eventType] || reminder.eventType;

                return (
                  <div key={reminder.id} className={styles["reminderCard"]}>
                    <img src={bellIcon} alt="Bell" className={styles["reminderCard__icon"]} />
                    <div className={styles["reminderCard__content"]}>
                      <div className={styles["reminderCard__time"]}>
                        {triggerDateFormatted} {triggerTime} <span className={styles["reminderCard__bullet"]}>•</span> {eventTypeLabel}
                      </div>
                      <div className={styles["reminderCard__description"]}>{reminder.description}</div>
                    </div>
                    <button
                      className={styles["reminderCard__deleteButton"]}
                      onClick={() => handleDeleteReminder(reminder.id)}
                      aria-label="Eliminar recordatorio"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!loadingReminders && reminders.length === 0 && (
            <div className={styles["emptyState"]}>
              <p>No hay recordatorios programados</p>
            </div>
          )}

          {/* Add Reminder Button */}
          <button className={styles["addReminderButton"]} onClick={handleOpenModal}>
            <span className={styles["addReminderButton__icon"]}>+</span>
            <span>Agregar Recordatorio</span>
          </button>
        </div>

        {/* Types Section */}
        <div className={styles["typesSection"]}>
          <h2 className={styles["typesSection__title"]}>Tipos de recordatorios</h2>

          {/* Vaccines */}
          <div className={styles["typeCard"]}>
            <div className={styles["typeCard__header"]}>
              <h3 className={styles["typeCard__title"]}>Vacunas</h3>
              <label className={styles["switch"]}>
                <input type="checkbox" checked={vaccinesEnabled} onChange={() => setVaccinesEnabled(!vaccinesEnabled)} />
                <span className={styles["switch__slider"]}></span>
              </label>
            </div>
            <p className={styles["typeCard__description"]}>Recibir recordatorios antes de las fechas de vacunación</p>
          </div>

          {/* Vet Visits */}
          <div className={styles["typeCard"]}>
            <div className={styles["typeCard__header"]}>
              <h3 className={styles["typeCard__title"]}>Visitas veterinarias</h3>
              <label className={styles["switch"]}>
                <input type="checkbox" checked={vetsEnabled} onChange={() => setVetsEnabled(!vetsEnabled)} />
                <span className={styles["switch__slider"]}></span>
              </label>
            </div>
            <p className={styles["typeCard__description"]}>Recordatorios de citas y chequeos veterinarios</p>
          </div>

          {/* Vet Visits */}
          <div className={styles["typeCard"]}>
            <div className={styles["typeCard__header"]}>
              <h3 className={styles["typeCard__title"]}>Alimentación</h3>
              <label className={styles["switch"]}>
                <input type="checkbox" checked={foodEnabled} onChange={() => setFoodEnabled(!foodEnabled)} />
                <span className={styles["switch__slider"]}></span>
              </label>
            </div>
            <p className={styles["typeCard__description"]}>Notificaciones para horarios de comida</p>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}

export default RemindersPage;
