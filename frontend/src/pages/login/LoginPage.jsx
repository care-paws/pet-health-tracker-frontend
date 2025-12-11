import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoUrl from "../../assets/logo.svg";
import { login } from "../../services/authService";
import styles from "./LoginPage.module.css";

function LoginPage() {
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
      const result = await login({ email, password });
      if (result.success) {
        console.log("Login successful:", result.user);
        // Redirect to pets page or dashboard
        navigate("/create-pet");
      }
    } catch (err) {
      setError(err.message || "Error al iniciar sesión. Por favor, intenta de nuevo.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className={styles["login-page"]}>
      {/* Header */}
      <header className={styles["login-page__header"]}>
        <div className={styles["login-page__logo"]}>
          <img src={logoUrl} alt="App logo" width={110} height={70} />
        </div>
        <button className={styles["login-page__back-button"]} onClick={handleBack} aria-label="Back">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#C48CB6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className={styles["login-page__main"]}>
        <h1 className={styles["login-page__title"]}>Inicia sesión</h1>
        <p className={styles["login-page__subtitle"]}>Ingresa a tu cuenta de Pet Care Paws</p>

        <form className={styles["login-form"]} onSubmit={handleSubmit}>
          {/* Error Message */}
          {error && <div className={styles["login-form__error"]}>{error}</div>}

          {/* Email Field */}
          <div className={styles["login-form__field"]}>
            <label className={styles["login-form__label"]} htmlFor="email">
              Email
            </label>
            <div className={styles["login-form__input-wrapper"]}>
              <div className={styles["login-form__icon"]}>
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
                className={styles["login-form__input"]}
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className={styles["login-form__field"]}>
            <label className={styles["login-form__label"]} htmlFor="password">
              Contraseña
            </label>
            <div className={styles["login-form__password-wrapper"]}>
              <div className={styles["login-form__password-icon"]}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" fill="#000000" />
                  <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <input
                type="password"
                id="password"
                className={styles["login-form__password-input"]}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button type="submit" className={styles["login-form__submit-button"]} disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>

          {/* Forgot Password Link */}
          <p className={styles["login-form__forgot-password"]}>¿has olvidado tu contraseña ?</p>

          {/* Register Button */}
          <button type="button" className={styles["login-form__register-button"]} onClick={() => navigate("/register")}>
            Registrarse
          </button>
        </form>
      </main>

      {/* Footer Navigation Bar */}
      <footer className={styles["login-page__footer"]}></footer>
    </div>
  );
}

export default LoginPage;
