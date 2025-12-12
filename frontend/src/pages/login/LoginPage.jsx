import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import PageLayout from "@/layouts/PageLayout";
import { login } from "@/services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const header = <AppHeader showBackButton={true} onBackClick={handleBack} showMenuButton={false} />;

  const footer = <AppFooter />;

  return (
    <PageLayout header={header} footer={footer}>
      {/* Main Content */}
      <main className={styles["loginPage__main"]}>
        <h1 className={styles["loginPage__title"]}>Inicia sesión</h1>
        <p className={styles["loginPage__subtitle"]}>Ingresa a tu cuenta de Pet Care Paws</p>

        <form className={styles["loginForm"]} onSubmit={handleSubmit}>
          {/* Error Message */}
          {error && <div className={styles["loginForm__error"]}>{error}</div>}

          {/* Email Field */}
          <div className={styles["loginForm__field"]}>
            <label className={styles["loginForm__label"]} htmlFor="email">
              Email
            </label>
            <div className={styles["loginForm__inputWrapper"]}>
              <div className={styles["loginForm__icon"]}>
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
                className={styles["loginForm__input"]}
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className={styles["loginForm__field"]}>
            <label className={styles["loginForm__label"]} htmlFor="password">
              Contraseña
            </label>
            <div className={styles["loginForm__passwordWrapper"]}>
              <div className={styles["loginForm__passwordIcon"]}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" fill="#000000" />
                  <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <input
                type="password"
                id="password"
                className={styles["loginForm__passwordInput"]}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button type="submit" className={styles["loginForm__submitButton"]} disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>

          {/* Forgot Password Link */}
          <p className={styles["loginForm__forgotPassword"]}>¿has olvidado tu contraseña ?</p>

          {/* Register Button */}
          <button type="button" className={styles["loginForm__registerButton"]} onClick={() => navigate("/register")}>
            Registrarse
          </button>
        </form>
      </main>
    </PageLayout>
  );
}

export default LoginPage;
