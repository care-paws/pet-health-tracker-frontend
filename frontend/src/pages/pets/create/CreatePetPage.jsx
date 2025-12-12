import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import PageLayout from "@/layouts/PageLayout";
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

  const header = <AppHeader showBackButton={true} onBackClick={handleBack} showMenuButton={false} />;

  const footer = <AppFooter />;

  return (
    <PageLayout header={header} footer={footer}>
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
    </PageLayout>
  );
}

export default CreatePetPage;
