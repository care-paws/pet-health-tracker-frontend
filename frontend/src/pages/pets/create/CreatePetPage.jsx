import { reminderIcon, weightIcon } from "@/assets/icons/icons";
import { pawPattern } from "@/assets/images/images";
import logoUrl from "@/assets/logo.svg";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import PageLayout from "@/layouts/PageLayout";
import { getPets } from "@/services/petService";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CreatePetPage.module.css";

function CreatePetPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const ensureNoPets = async () => {
      try {
        const result = await getPets();
        const pets = result.pets || [];
        if (pets.length > 0) {
          navigate("/pets");
        }
      } catch (err) {
        // Si está desautenticado, enviamos a login; si falla por otro motivo, seguimos en esta vista.
        if (err?.message?.includes("iniciar sesión")) {
          navigate("/login");
        }
      }
    };

    ensureNoPets();
  }, [navigate]);

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
        <Link to="/">
          <img src={logoUrl} alt="Care Paws" width={110} height={70} />
        </Link>
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
            <p>Empieza creando el perfil de tu primera mascota con el botón de abajo.</p>
            <p>Más adelante podrás agregar más mascotas y activar recordatorios de vacunas, visitas al vet y alimentación para cada una.</p>
            <ul className={styles["featureList"]}>
              <li className={styles["featureItem"]}>
                <img src={reminderIcon} alt="Recordatorios" className={styles["featureItem__icon"]} />
                <span>Activa recordatorios de vacunas y citas</span>
              </li>
              <li className={styles["featureItem"]}>
                <img src={weightIcon} alt="Control de peso" className={styles["featureItem__icon"]} />
                <span>Lleva el control del peso y bienestar</span>
              </li>
            </ul>
          </div>
          <button className={styles["createPetContainer__button"]} onClick={handleCreateFirst}>
            Agregar mi primera mascota
          </button>
        </div>
      </main>
    </PageLayout>
  );
}

export default CreatePetPage;
