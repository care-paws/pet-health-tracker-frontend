import { pawPattern } from "@/assets/images/images";
import logoUrl from "@/assets/logo.svg";
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

  const header = (
    <div className={styles["createPetPage__headerWrap"]}>
      <AppHeader
        className={styles["createPetPage__header"]}
        showBackButton={true}
        backPosition="right"
        centerAlign="start"
        onBackClick={handleBack}
        showMenuButton={false}
      >
        <img src={logoUrl} alt="Care Paws" width={110} height={70} />
      </AppHeader>
    </div>
  );

  const footer = <AppFooter />;

  return (
    <PageLayout className={styles["createPetPage"]} header={header} footer={footer}>
      <main className={styles["createPetPage__main"]}>
        <div className={styles["createPetPage__pattern"]} style={{ backgroundImage: `url(${pawPattern})` }} />

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
