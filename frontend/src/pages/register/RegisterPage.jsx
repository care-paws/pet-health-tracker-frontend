import logoUrl from "@/assets/logo.svg";
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
        console.log("Registration successful:", result.message);
        // Navigate to create pet page after successful registration
        navigate("/create-pet");
      }
    } catch (err) {
      setError(err.message || "Error al registrarse. Por favor, intenta de nuevo.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className={styles["register-page"]}>
      {/* Header */}
      <header className={styles["register-page__header"]}>
        <div className={styles["register-page__logo"]}>
          <img src={logoUrl} alt="App logo" width={110} height={70} />
        </div>
        <button className={styles["register-page__back-button"]} onClick={handleBack} aria-label="Back">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#C48CB6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className={styles["register-page__main"]}>
        {/* Logo Grande */}
        <div className={styles["register-page__logo-large"]}>
          <img src={logoUrl} alt="Care Paws" />
        </div>

        <h1 className={styles["register-page__title"]}>Registrarse</h1>

        <form className={styles["register-form"]} onSubmit={handleSubmit}>
          {/* Error Message */}
          {error && <div className={styles["register-form__error"]}>{error}</div>}

          {/* User Type Field */}
          <div className={styles["register-form__field"]}>
            <div className={styles["register-form__select-wrapper"]}>
              <select id="userType" className={styles["register-form__select"]} value={userType} onChange={e => setUserType(e.target.value)} required>
                <option value="" disabled>
                  Tipo de usuario
                </option>
                <option value="owner">Dueño de mascota</option>
                <option value="veterinarian">Veterinario</option>
                <option value="shelter">Refugio</option>
              </select>
            </div>
          </div>

          {/* Email Field */}
          <div className={styles["register-form__field"]}>
            <label className={styles["register-form__label"]} htmlFor="email">
              Email
            </label>
            <div className={styles["register-form__input-wrapper"]}>
              <div className={styles["register-form__icon"]}>
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
                className={styles["register-form__input"]}
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className={styles["register-form__field"]}>
            <label className={styles["register-form__label"]} htmlFor="password">
              Contraseña
            </label>
            <div className={styles["register-form__password-wrapper"]}>
              <div className={styles["register-form__password-icon"]}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" fill="#000000" />
                  <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <input
                type="password"
                id="password"
                className={styles["register-form__password-input"]}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles["register-form__submit-button"]} disabled={loading}>
            {loading ? "Registrando..." : "Confirmar"}
          </button>
        </form>
      </main>

      {/* Footer Navigation Bar */}
      <footer className={styles["register-page__footer"]}></footer>
    </div>
  );
}

export default RegisterPage;
