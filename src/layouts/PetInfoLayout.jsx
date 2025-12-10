import './PetInfoLayout.css';

function PetInfoLayout() {
  return (
    <div className="pet-info-layout">
      <header className="header">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/b31101e4e03015bcf437a0697fd6836ba64da5ca?width=208" 
          alt="Care Paws Logo" 
          className="logo"
        />
        <button className="back-button">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="42" height="42" rx="10" fill="#C48CB6"/>
            <path d="M7.00001 17.4999L5.76276 18.7372L4.52551 17.4999L5.76276 16.2627L7.00001 17.4999ZM36.75 31.4999C36.75 31.9641 36.5656 32.4092 36.2374 32.7374C35.9093 33.0656 35.4641 33.2499 35 33.2499C34.5359 33.2499 34.0908 33.0656 33.7626 32.7374C33.4344 32.4092 33.25 31.9641 33.25 31.4999H36.75ZM14.5128 27.4872L5.76276 18.7372L8.23726 16.2627L16.9873 25.0127L14.5128 27.4872ZM5.76276 16.2627L14.5128 7.5127L16.9873 9.98719L8.23726 18.7372L5.76276 16.2627ZM7.00001 15.7499H24.5V19.2499H7.00001V15.7499ZM36.75 27.9999V31.4999H33.25V27.9999H36.75ZM24.5 15.7499C27.7489 15.7499 30.8647 17.0406 33.1621 19.3379C35.4594 21.6352 36.75 24.751 36.75 27.9999H33.25C33.25 25.6793 32.3281 23.4537 30.6872 21.8128C29.0463 20.1718 26.8207 19.2499 24.5 19.2499V15.7499Z" fill="#FFEBCC"/>
          </svg>
        </button>
      </header>

      <div className="hero-image">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/7ac6ff18019a61b780a094c7da59d2b25ecaafd8?width=826" 
          alt="Background" 
          className="background-pattern"
        />
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/25fca89feca6076e3726f3edfb206a24fecc3b44?width=550" 
          alt="Pet" 
          className="pet-image"
        />
      </div>

      <div className="form-container">
        <div className="form-group">
          <label className="form-label">
            Nombre <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <svg width="40" height="34" viewBox="0 0 40 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M33.6875 13.7812C33.6875 14.1874 33.5262 14.5768 33.239 14.864C32.9518 15.1512 32.5624 15.3125 32.1562 15.3125H24.5C24.0939 15.3125 23.7044 15.1512 23.4172 14.864C23.1301 14.5768 22.9688 14.1874 22.9688 13.7812C22.9688 13.3751 23.1301 12.9857 23.4172 12.6985C23.7044 12.4113 24.0939 12.25 24.5 12.25H32.1562C32.5624 12.25 32.9518 12.4113 33.239 12.6985C33.5262 12.9857 33.6875 13.3751 33.6875 13.7812ZM32.1562 18.375H24.5C24.0939 18.375 23.7044 18.5363 23.4172 18.8235C23.1301 19.1107 22.9688 19.5001 22.9688 19.9062C22.9688 20.3124 23.1301 20.7018 23.4172 20.989C23.7044 21.2762 24.0939 21.4375 24.5 21.4375H32.1562C32.5624 21.4375 32.9518 21.2762 33.239 20.989C33.5262 20.7018 33.6875 20.3124 33.6875 19.9062C33.6875 19.5001 33.5262 19.1107 33.239 18.8235C32.9518 18.5363 32.5624 18.375 32.1562 18.375Z" fill="#C48CB6"/>
            </svg>
            <input type="text" placeholder="Ej  Max" className="form-input" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Fecha de nacimiento <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.1826 4.0282H23.1615V3.02118C23.1615 2.7541 23.0554 2.49796 22.8665 2.30911C22.6777 2.12026 22.4215 2.01416 22.1545 2.01416C21.8874 2.01416 21.6312 2.12026 21.4424 2.30911C21.2535 2.49796 21.1474 2.7541 21.1474 3.02118V4.0282H11.0772V3.02118C11.0772 2.7541 10.9711 2.49796 10.7823 2.30911C10.5934 2.12026 10.3373 2.01416 10.0702 2.01416C9.80313 2.01416 9.54699 2.12026 9.35814 2.30911C9.16928 2.49796 9.06319 2.7541 9.06319 3.02118V4.0282H6.04212C5.50796 4.0282 4.99568 4.2404 4.61798 4.6181C4.24027 4.99581 4.02808 5.50809 4.02808 6.04225V26.1827C4.02808 26.7168 4.24027 27.2291 4.61798 27.6068C4.99568 27.9845 5.50796 28.1967 6.04212 28.1967H26.1826C26.7167 28.1967 27.229 27.9845 27.6067 27.6068C27.9844 27.2291 28.1966 26.7168 28.1966 26.1827V6.04225C28.1966 5.50809 27.9844 4.99581 27.6067 4.6181C27.229 4.2404 26.7167 4.0282 26.1826 4.0282Z" fill="#C48CB6"/>
            </svg>
            <input type="text" value="15 de dic . de 2024 12 13 PM" className="form-input" readOnly />
          </div>
        </div>

        <div className="gender-group">
          <div className="gender-option">
            <div className="radio-button"></div>
            <span className="gender-label">Hembra</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 16C18 16.5304 17.7893 17.0391 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18H2C1.46957 18 0.960859 17.7893 0.585786 17.4142C0.210714 17.0391 0 16.5304 0 16V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0L16 0C16.5304 0 17.0391 0.210714 17.4142 0.585786C17.7893 0.960859 18 1.46957 18 2V16Z" fill="#C570D0" fillOpacity="0.8"/>
            </svg>
          </div>
          <div className="gender-option">
            <div className="radio-button"></div>
            <span className="gender-label">Macho</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 2.57143C0 1.88944 0.270918 1.23539 0.753154 0.753154C1.23539 0.270918 1.88944 0 2.57143 0H15.4286C16.1106 0 16.7646 0.270918 17.2468 0.753154C17.7291 1.23539 18 1.88944 18 2.57143V15.4286C18 16.1106 17.7291 16.7646 17.2468 17.2468C16.7646 17.7291 16.1106 18 15.4286 18H2.57143C1.88944 18 1.23539 17.7291 0.753154 17.2468C0.270918 16.7646 0 16.1106 0 15.4286V2.57143Z" fill="#8AEABC"/>
            </svg>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            El peso de tu macotas <span className="required">*</span>
          </label>
          <div className="input-wrapper weight-input">
            <input type="text" placeholder="Eje  3  kilogramos " className="form-input" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Elige un tipo de mascota <span className="required">*</span>
          </label>
        </div>

        <div className="pet-type-grid">
          <div className="pet-type-item">
            <div className="pet-type-circle">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?width=226" alt="Tortuga" />
            </div>
            <div className="pet-type-label">Tortuga</div>
          </div>
          <div className="pet-type-item">
            <div className="pet-type-circle">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?width=206" alt="Cobayo" />
            </div>
            <div className="pet-type-label">Cobayo</div>
          </div>
          <div className="pet-type-item">
            <div className="pet-type-circle">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?width=200" alt="Lobo" />
            </div>
            <div className="pet-type-label">Lobo</div>
          </div>
          <div className="pet-type-item">
            <div className="pet-type-circle">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?width=200" alt="Gato" />
            </div>
            <div className="pet-type-label">Gato</div>
          </div>
          <div className="pet-type-item">
            <div className="pet-type-circle">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?width=240" alt="Perro" />
            </div>
            <div className="pet-type-label">Perro</div>
          </div>
          <div className="pet-type-item">
            <div className="pet-type-circle">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?width=208" alt="Conejo" />
            </div>
            <div className="pet-type-label">Conejo</div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label-secondary">Raza</label>
          <div className="input-wrapper"></div>
        </div>

        <div className="form-group">
          <label className="form-label-secondary">Color </label>
          <div className="input-wrapper"></div>
        </div>

        <div className="upload-section">
          <h3 className="upload-title">
            <span className="upload-title-main">subir foto de tu mascota</span>
            <span className="upload-subtitle">Actualiza las fotografías de tu mascota</span>
          </h3>
          <div className="upload-area">
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M33 3C19.6421 3 12.9632 3 8.53579 6.78316C7.90421 7.32211 7.32 7.90632 6.78316 8.53579C3 12.9632 3 19.6421 3 33C3 46.3579 3 53.0368 6.78316 57.4642C7.32211 58.0958 7.90632 58.68 8.53579 59.2168C12.9632 63 19.6421 63 33 63C46.3579 63 53.0368 63 57.4642 59.2168C58.0958 58.6779 58.68 58.0937 59.2168 57.4642C63 53.0368 63 46.3579 63 33M44.0526 12.4737C45.9158 10.5568 50.8737 3 53.5263 3C56.1789 3 61.1368 10.5568 63 12.4737M53.5263 4.57895V25.1053" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="upload-text">
              subir   imagen<br/><br/>
              Haz clic o arrastra una imagen  <br/><br/>
              Aquí<br/><br/>
              PNG , JPG  O WEBP ( máx .5MBM)
            </p>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn-secondary">Cancelar</button>
          <button className="btn-primary">Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default PetInfoLayout;
