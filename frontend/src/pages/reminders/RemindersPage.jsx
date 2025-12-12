import { bellIcon, reminderCardIcon } from "@/assets/icons/icons";
import logoUrl from "@/assets/logo.svg";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import PageLayout from "@/layouts/PageLayout";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./RemindersPage.module.css";

function RemindersPage() {
  const [activeSchedule, setActiveSchedule] = useState(true);
  const [vaccinesEnabled, setVaccinesEnabled] = useState(false);
  const [vetsEnabled, setVetsEnabled] = useState(false);

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
      <main className={styles["remindersPage__main"]}>
        {/* Page Title */}
        <div className={styles["pageTitle"]}>
          <img src={reminderCardIcon} alt="Recordatorios" className={styles["pageTitle__icon"]} />
          <h1 className={styles["pageTitle__text"]}>Recordatorios</h1>
        </div>

        {/* Schedule Section */}
        <div className={styles["scheduleSection"]}>
          <div className={styles["scheduleHeader"]}>
            <h2 className={styles["scheduleHeader__title"]}>Horarios del día</h2>
            <button
              className={`${styles["toggleButton"]} ${activeSchedule ? styles["toggleButton--active"] : ""}`}
              onClick={() => setActiveSchedule(!activeSchedule)}
            >
              {activeSchedule ? "Activo" : "Inactivo"}
            </button>
          </div>

          {/* Reminder Card */}
          <div className={styles["reminderCard"]}>
            <img src={bellIcon} alt="Bell" className={styles["reminderCard__icon"]} />
            <div className={styles["reminderCard__content"]}>
              <div className={styles["reminderCard__time"]}>
                12:00 <span className={styles["reminderCard__bullet"]}>•</span> 150 g
              </div>
              <div className={styles["reminderCard__description"]}>Alimento húmedo para perros</div>
            </div>
          </div>

          {/* Add Reminder Button */}
          <button className={styles["addReminderButton"]}>
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
        </div>
      </main>
    </PageLayout>
  );
}

export default RemindersPage;

