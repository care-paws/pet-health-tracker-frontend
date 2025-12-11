import './FeedingLayout.css';

function FeedingLayout() {
  return (
    <div className="feeding-layout">
      <header className="feeding-header">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/35ba796a76fb228b9b872cbfb3e36685cc23742d?width=220" 
          alt="Care Paws Logo" 
          className="feeding-logo"
        />
        <button className="feeding-menu-button">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 30V26.6667H35V30H5ZM5 21.6667V18.3333H35V21.6667H5ZM5 13.3333V10H35V13.3333H5Z" fill="#FFEBCC"/>
          </svg>
        </button>
      </header>

      <div className="feeding-title-section">
        <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.0937 8.00001C13.3499 8.00001 11.8719 9.29151 11.6911 11.0188C11.4289 13.4828 11 17.9435 11 20.6875C11 23.2775 12.2015 25.591 14.0782 27.1135C14.6949 27.614 14.9873 28.1635 14.9873 28.6255V29.784L14.9856 29.8663C14.9129 30.9145 14.1013 42.6185 14.1013 44.75C14.1013 45.4394 14.2388 46.1221 14.506 46.7591C14.7731 47.396 15.1647 47.9748 15.6584 48.4623C16.1521 48.9498 16.7382 49.3365 17.3832 49.6004C18.0282 49.8642 18.7196 50 19.4177 50C20.1159 50 20.8072 49.8642 21.4522 49.6004C22.0973 49.3365 22.6833 48.9498 23.177 48.4623C23.6707 47.9748 24.0623 47.396 24.3295 46.7591C24.5967 46.1221 24.7342 45.4394 24.7342 44.75C24.7342 42.6185 23.9243 30.9145 23.8499 29.8663L23.8481 29.784V28.6255C23.8481 28.1618 24.1405 27.614 24.7572 27.1135C25.7205 26.3346 26.4964 25.354 27.0287 24.2426C27.5611 23.1313 27.8367 21.9169 27.8354 20.6875C27.8354 17.9435 27.4066 13.4828 27.1443 11.0188C27.0557 10.1891 26.6589 9.42129 26.0305 8.86373C25.402 8.30617 24.5866 7.99844 23.7418 8.00001C22.9319 8.00001 22.1858 8.27651 21.5975 8.74026C20.9747 8.26057 20.2075 8.00004 19.4177 8.00001C18.6279 8.00004 17.8607 8.26057 17.238 8.74026C16.6295 8.25948 15.873 7.99832 15.0937 8.00001Z" fill="#C48CB6" fillOpacity="0.81"/>
        </svg>
        <h1 className="feeding-title">Alimentación</h1>
      </div>

      <div className="feeding-content">
        <div className="feeding-description">
          <p>Gestión de de los horarios de comida de tu mascota</p>
          <button className="feeding-add-button">
            <span>+</span>
            <span>Agregar<br/>Horario</span>
          </button>
        </div>

        <div className="feeding-schedule-card">
          <div className="feeding-schedule-header">
            <span className="feeding-schedule-label">Horarios del dia</span>
            <span className="feeding-schedule-status">Completado</span>
          </div>
          <div className="feeding-schedule-item completed">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 15C0 11.0218 1.58035 7.20644 4.3934 4.3934C7.20644 1.58035 11.0218 0 15 0C18.9782 0 22.7936 1.58035 25.6066 4.3934C28.4196 7.20644 30 11.0218 30 15C30 18.9782 28.4196 22.7936 25.6066 25.6066C22.7936 28.4196 18.9782 30 15 30C11.0218 30 7.20644 28.4196 4.3934 25.6066C1.58035 22.7936 0 18.9782 0 15ZM14.144 21.42L22.78 10.624L21.22 9.376L13.856 18.578L8.64 14.232L7.36 15.768L14.144 21.42Z" fill="#C48CB6"/>
            </svg>
            <div className="feeding-schedule-info">
              <p className="feeding-time strikethrough">07 : 30</p>
              <p className="feeding-amount">  .  150 g</p>
              <p className="feeding-food">Alimento  húmedo para perros</p>
            </div>
          </div>
        </div>

        <div className="feeding-schedule-card">
          <div className="feeding-schedule-header">
            <span className="feeding-schedule-label">Horarios del dia</span>
            <span className="feeding-schedule-status">Completado</span>
          </div>
          <div className="feeding-schedule-item">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 15C0 11.0218 1.58035 7.20644 4.3934 4.3934C7.20644 1.58035 11.0218 0 15 0C18.9782 0 22.7936 1.58035 25.6066 4.3934C28.4196 7.20644 30 11.0218 30 15C30 18.9782 28.4196 22.7936 25.6066 25.6066C22.7936 28.4196 18.9782 30 15 30C11.0218 30 7.20644 28.4196 4.3934 25.6066C1.58035 22.7936 0 18.9782 0 15ZM14.144 21.42L22.78 10.624L21.22 9.376L13.856 18.578L8.64 14.232L7.36 15.768L14.144 21.42Z" fill="#C48CB6"/>
            </svg>
            <div className="feeding-schedule-info">
              <p className="feeding-time">12 : 00  .  150 g</p>
              <p className="feeding-food">Alimento  húmedo para perros</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="feeding-nav">
        <div className="feeding-nav-item active">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.6666 14.9998L19.9999 1.6665L3.33325 14.9998V18.3332H6.66659V34.9998H14.9999V28.3332C14.9999 27.0071 15.5267 25.7353 16.4644 24.7976C17.4021 23.86 18.6738 23.3332 19.9999 23.3332C21.326 23.3332 22.5978 23.86 23.5355 24.7976C24.4731 25.7353 24.9999 27.0071 24.9999 28.3332V34.9998H33.3333V18.3332H36.6666V14.9998Z" fill="#FFEBCC"/>
          </svg>
          <span>    Inicio</span>
        </div>
        <div className="feeding-nav-item">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33.125 12.8125C32.3215 12.8125 31.5361 13.0508 30.868 13.4972C30.1999 13.9436 29.6792 14.578 29.3717 15.3203C29.0643 16.0627 28.9838 16.8795 29.1406 17.6676C29.2973 18.4556 29.6842 19.1795 30.2524 19.7476C30.8205 20.3158 31.5444 20.7027 32.3324 20.8594C33.1205 21.0162 33.9373 20.9357 34.6797 20.6283C35.422 20.3208 36.0565 19.8001 36.5028 19.132C36.9492 18.4639 37.1875 17.6785 37.1875 16.875C37.1875 15.7976 36.7595 14.7642 35.9976 14.0024C35.2358 13.2405 34.2024 12.8125 33.125 12.8125Z" fill="#FFEBCC"/>
          </svg>
          <span>Mascotas</span>
        </div>
      </nav>
    </div>
  );
}

export default FeedingLayout;
