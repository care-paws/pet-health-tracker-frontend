import { calendarButtonIcon, heartButtonIcon, plusButtonIcon } from "@/assets/icons/icons";
import logoUrl from "@/assets/logo.svg";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import PageLayout from "@/layouts/PageLayout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    setIsMenuOpen(false);
    navigate("/login");
  };

  const handleRegisterClick = () => {
    setIsMenuOpen(false);
    navigate("/register");
  };

  const header = (
    <div className={styles["landingPage__headerWrap"]}>
      <AppHeader className={styles["landingPage__header"]} showBackButton={false} showMenuButton={true} onMenuClick={toggleMenu} centerAlign="start">
        <Link to="/">
          <img src={logoUrl} alt="App logo" width={110} height={70} />
        </Link>
      </AppHeader>
    </div>
  );

  const footer = <AppFooter className={styles["landingPage__footer"]} />;

  return (
    <PageLayout className={styles.landingPage} header={header} footer={footer}>
      {/* Menu Overlay */}
      {isMenuOpen && <div className={styles["menuOverlay"]} onClick={closeMenu}></div>}

      {/* Side Menu */}
      <nav className={`${styles["sideMenu"]} ${isMenuOpen ? styles["sideMenuOpen"] : ""}`}>
        <div className={styles["sideMenu__content"]}>
          <button className={styles["sideMenu__backButton"]} onClick={closeMenu} aria-label="Back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#FFEBCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className={styles["sideMenu__closeButton"]} onClick={closeMenu} aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="#FFEBCC" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className={styles["sideMenu__buttons"]}>
            <button className={styles["sideMenu__button"]} onClick={handleLoginClick}>
              Iniciar sesión
            </button>
            <button className={styles["sideMenu__button"]} onClick={handleRegisterClick}>
              Registrarme
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className={styles["landingPage__mainContent"]}>
        {/* Hero Section */}
        <section className={styles["heroSection"]}>
          <h1 className={styles["heroSection__title"]}>La salud de tu mascota, siempre bajo control</h1>
          <p className={styles["heroSection__description"]}>
            Gestiona de forma centralizada la salud y el bienestar de tus mascotas: vacunas, visitas veterinarias, alimentación y recordatorios
            automáticos.
          </p>
        </section>

        {/* How it Works Section */}
        <section className={styles["howItWorks"]}>
          <h2 className={styles["howItWorks__title"]}>¿Cómo funciona?</h2>
          <p className={styles["howItWorks__subtitle"]}>Tres pasos simples para comenzar a cuidar mejor de tus mascotas</p>
        </section>

        {/* Step 1 */}
        <div className={styles["stepIcon"]}>
          <img src={plusButtonIcon} alt="plus button" width={71} height={71} />
        </div>
        <section className={styles["step"]}>
          <h3 className={styles["step__title"]}>1. Crea tu cuenta</h3>
          <p className={styles["step__description"]}>Regístrate en segundos con tu correo electrónico. Es completamente gratis.</p>
        </section>

        {/* Step 2 Icon */}
        <div className={`${styles["stepIcon"]} ${styles["stepIconMedium"]}`}>
          <img src={heartButtonIcon} alt="heart button" width={71} height={71} />
        </div>
        <section className={styles["step"]}>
          <h3 className={styles["step__title"]}>2. Agrega tus mascotas</h3>
          <p className={styles["step__description"]}>Crea perfiles con información básica: nombre, especie, edad y peso.</p>
        </section>

        {/* Step 3 Icon */}
        <div className={`${styles["stepIcon"]} ${styles["stepIconLarge"]}`}>
          <img src={calendarButtonIcon} alt="calendar" width={71} height={71} />
        </div>
        <section className={styles["step"]}>
          <h3 className={styles["step__title"]}>3. Registra y programa</h3>
          <p className={styles["step__description"]}>Lleva un historial de salud completo y recibe recordatorios automáticos.</p>
        </section>

        {/* Feature Cards */}
        <div className={`${styles["featureCard"]} ${styles["featureCardFirst"]}`}>
          <div className={styles["featureCard__icon"]}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="#C48CB6" strokeWidth="2" />
              <circle cx="12" cy="12" r="3" stroke="#C48CB6" strokeWidth="2" />
            </svg>
          </div>
          <h3 className={styles["featureCard__title"]}>Registro fotográfico</h3>
          <p className={styles["featureCard__description"]}>Gestiona las fotos y álbumes para tus mascotas y crea recuerdos inolvidable.</p>
        </div>

        <div className={styles["featureCard"]}>
          <div className={styles["featureCard__icon"]}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7V17C3 19.2091 7.02944 21 12 21C16.9706 21 21 19.2091 21 17V7L12 2Z" stroke="#C48CB6" strokeWidth="2" />
              <circle cx="12" cy="13" r="3" stroke="#C48CB6" strokeWidth="2" />
            </svg>
          </div>
          <h3 className={styles["featureCard__title"]}>Historial de salud completo</h3>
          <p className={styles["featureCard__description"]}>Registra vacunas, desparasitaciones, visitas al veterinario y controles de rutina.</p>
        </div>

        <div className={styles["featureCard"]}>
          <div className={styles["featureCard__icon"]}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#C48CB6" strokeWidth="2" />
              <path d="M12 6V12L16 14" stroke="#C48CB6" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className={styles["featureCard__title"]}>Recordatorios automáticos</h3>
          <p className={styles["featureCard__description"]}>Nunca olvides una vacuna o cita veterinaria con nuestro sistema de alertas.</p>
        </div>

        <div className={styles["featureCard"]}>
          <div className={styles["featureCard__icon"]}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
                stroke="#C570D0"
                strokeWidth="2"
              />
              <path d="M12 3L8 7H16L12 3Z" fill="#C570D0" />
            </svg>
          </div>
          <h3 className={styles["featureCard__title"]}>Seguimiento nutricional</h3>
          <p className={styles["featureCard__description"]}>Programa horarios de alimentación y mantén un registro de la dieta de tu mascota.</p>
        </div>

        {/* Call to Action */}
        <section className={styles["ctaSection"]}>
          <h2 className={styles["ctaSection__title"]}>¿Listo para cuidar mejor de tus mascotas?</h2>
          <p className={styles["ctaSection__description"]}>Únete a miles de dueños que ya confían en Pet Health Tracker</p>
        </section>

        {/* CTA Button */}
        <button className={styles["ctaButton"]}>Comenzar ahora</button>
      </main>
    </PageLayout>
  );
}

export default LandingPage;
