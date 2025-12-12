import logoUrl from "@/assets/logo.svg";
import { useNavigate } from "react_router_dom";
import styles from "./CreatePetPage.module.css";

function CreatePetPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleCreateFirst = () => {
    navigate("/pet_form");
  };

  return (
    <div className={styles["createPetPage"]}>
      {/* Header */}
      <header className={styles["createPetPage__header"]}>
        <div className={styles["createPetPage__logo"]}>
          <img src={logoUrl} alt="App logo" width={104} height={66} />
        </div>
        <button className={styles["createPetPage__backButton"]} onClick={handleBack} aria_label="Back">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#C48CB6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className={styles["createPetPage__main"]}>
        {/* Paw Pattern Image */}
        <div className={styles["createPetPage__pattern"]}>{/* Pattern will be a background image in CSS */}</div>

        {/* Content Container */}
        <div className={styles["createPetContainer"]}>
          <div className={styles["createPetContainer__text"]}>
            <p>Añade tu primer mascota haciendo clic en el botón + en la parte superior o el botón de abajo.</p>
          </div>
          <button className={styles["createPetContainer__button"]} onClick={handleCreateFirst}>
            Crear el primero
          </button>
        </div>
      </main>

      {/* Footer Navigation Bar */}
      <footer className={styles["createPetPage__footer"]}></footer>
    </div>
  );
}

export default CreatePetPage;
