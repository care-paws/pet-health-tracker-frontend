import logoUrl from "@/assets/logo.svg";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import PageLayout from "@/layouts/PageLayout";
import { register } from "@/services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await register({ email, password, userType });
      if (result.success) {
        navigate("/create-pet");
      }
    } catch (err) {
      setError(err.message || "Error al registrarse. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const header = <AppHeader showBackButton={true} onBackClick={handleBack} showMenuButton={false} />;
  const footer = <AppFooter />;

  return (
    <PageLayout header={header} footer={footer}>
      <main className={styles["registerPage__main"]}>
        <div className={styles["registerPage__logoLarge"]}>
          <img src={logoUrl} alt="Care Paws" />
        </div>

        <h1 className={styles["registerPage__title"]}>Registrarse</h1>

        <form className={styles["registerForm"]} onSubmit={handleSubmit}>
          {error && <div className={styles["registerForm__error"]}>{error}</div>}

          <div className={styles["registerForm__field"]}>
            <div className={styles["registerForm__selectWrapper"]}>
              <select id="userType" className={styles["registerForm__select"]} value={userType} onChange={e => setUserType(e.target.value)} required>
                <option value="" disabled>
                  Tipo de usuario
                </option>
                <option value="owner">Dueño de mascota</option>
                <option value="veterinarian">Veterinario</option>
                <option value="shelter">Refugio</option>
              </select>
            </div>
          </div>

          <div className={styles["registerForm__field"]}>
            <label className={styles["registerForm__label"]} htmlFor="email">
              Email
            </label>
            <div className={styles["registerForm__inputWrapper"]}>
              <div className={styles["registerForm__icon"]}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M22 6L12 13L2 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                className={styles["registerForm__input"]}
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </div>
          </div>

          <div className={styles["registerForm__field"]}>
            <label className={styles["registerForm__label"]} htmlFor="password">
              Contraseña
            </label>
            <div className={styles["registerForm__passwordWrapper"]}>
              <div className={styles["registerForm__passwordIcon"]}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" fill="#000000" />
                  <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <input
                type="password"
                id="password"
                className={styles["registerForm__passwordInput"]}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
          </div>

          <button type="submit" className={styles["registerForm__submitButton"]} disabled={loading}>
            {loading ? "Registrando..." : "Confirmar"}
          </button>
        </form>
      </main>
    </PageLayout>
  );
}

export default RegisterPage;
