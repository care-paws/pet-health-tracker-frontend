import './LoginLayout.css';

function LoginLayout() {
  return (
    <div className="login-layout">
      <header className="login-header">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/35ba796a76fb228b9b872cbfb3e36685cc23742d?width=220" 
          alt="Care Paws Logo" 
          className="login-logo"
        />
        <button className="login-back-button">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="42" height="42" rx="10" fill="#C48CB6"/>
            <path d="M7.00001 17.4999L5.76276 18.7372L4.52551 17.4999L5.76276 16.2627L7.00001 17.4999ZM36.75 31.4999C36.75 31.9641 36.5656 32.4092 36.2374 32.7374C35.9093 33.0656 35.4641 33.2499 35 33.2499C34.5359 33.2499 34.0908 33.0656 33.7626 32.7374C33.4344 32.4092 33.25 31.9641 33.25 31.4999H36.75ZM14.5128 27.4872L5.76276 18.7372L8.23726 16.2627L16.9873 25.0127L14.5128 27.4872ZM5.76276 16.2627L14.5128 7.5127L16.9873 9.98719L8.23726 18.7372L5.76276 16.2627ZM7.00001 15.7499H24.5V19.2499H7.00001V15.7499ZM36.75 27.9999V31.4999H33.25V27.9999H36.75ZM24.5 15.7499C27.7489 15.7499 30.8647 17.0406 33.1621 19.3379C35.4594 21.6352 36.75 24.751 36.75 27.9999H33.25C33.25 25.6793 32.3281 23.4537 30.6872 21.8128C29.0463 20.1718 26.8207 19.2499 24.5 19.2499V15.7499Z" fill="#FFEBCC"/>
          </svg>
        </button>
      </header>

      <div className="login-content">
        <h1 className="login-title">Inicia  sesión  </h1>
        <p className="login-subtitle">Ingresa a tu cuenta de Pet Care Paws</p>

        <div className="login-form">
          <label className="login-label">Email</label>
          <div className="login-input-wrapper">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.8125 11.2502L18.9327 19.2339C19.5748 19.6949 20.4252 19.6949 21.0673 19.2339L32.1875 11.2502M8.75 31.6668H31.25C33.3211 31.6668 35 29.9257 35 27.7779V12.2224C35 10.0746 33.3211 8.3335 31.25 8.3335H8.75C6.67893 8.3335 5 10.0746 5 12.2224V27.7779C5 29.9257 6.67893 31.6668 8.75 31.6668Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="login-input-text">Noelia.m.garcia98@gmail.com</span>
          </div>

          <label className="login-label">Contraseña</label>
          <div className="login-input-wrapper">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.5">
              <path fillRule="evenodd" clipRule="evenodd" d="M20 5.71429C16.8441 5.71429 14.2857 8.27266 14.2857 11.4286V14.2857H25.7143V11.4286C25.7143 8.27266 23.1559 5.71429 20 5.71429ZM8.5714 11.4286V14.2857C6.20451 14.2858 4.28577 16.2045 4.28577 18.5714V35.7143C4.28577 38.0811 6.20454 40 8.57148 40H31.4285C33.7957 40 35.7143 38.0811 35.7143 35.7143V18.5714C35.7143 16.2045 33.7957 14.2857 31.4285 14.2857V11.4286C31.4285 5.11674 26.3118 0 20 0C13.6881 0 8.5714 5.11674 8.5714 11.4286Z" fill="black"/>
            </svg>
            <span className="login-input-text password">*******</span>
          </div>

          <button className="login-button">Iniciar  sesión</button>

          <p className="login-forgot">¿has olvidado tu contraseña ?</p>

          <button className="login-register-button">Registrarse </button>
        </div>
      </div>
    </div>
  );
}

export default LoginLayout;
