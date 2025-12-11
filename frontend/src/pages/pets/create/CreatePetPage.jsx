import logoUrl from "@/assets/logo.svg";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePetPage.module.css";

function CreatePetPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleCreateFirst = () => {
    navigate("/pet-form");
  };

  return (
    <div className={styles["create-pet-page"]}>
      {/* Header */}
      <header className={styles["create-pet-page__header"]}>
        <div className={styles["create-pet-page__logo"]}>
          <img src={logoUrl} alt="App logo" width={104} height={66} />
        </div>
        <button className={styles["create-pet-page__back-button"]} onClick={handleBack} aria-label="Back">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#C48CB6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className={styles["create-pet-page__main"]}>
        {/* Paw Pattern Image */}
        <div className={styles["create-pet-page__pattern"]}>{/* Pattern will be a background image in CSS */}</div>

        {/* Content Container */}
        <div className={styles["create-pet-container"]}>
          <div className={styles["create-pet-container__text"]}>
            <p>Añade tu primer mascota haciendo clic en el botón + en la parte superior o el botón de abajo.</p>
          </div>
          <button className={styles["create-pet-container__button"]} onClick={handleCreateFirst}>
            Crear el primero
          </button>
        </div>
      </main>

      {/* Footer Navigation Bar */}
      <footer className={styles["create-pet-page__footer"]}></footer>
    </div>
  );
}

export default CreatePetPage;
