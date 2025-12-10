import './WeightLayout.css';

function WeightLayout() {
  return (
    <div className="weight-layout">
      <header className="weight-header">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/35ba796a76fb228b9b872cbfb3e36685cc23742d?width=220" 
          alt="Care Paws Logo" 
          className="weight-logo"
        />
        <button className="weight-menu-button">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 30V26.6667H35V30H5ZM5 21.6667V18.3333H35V21.6667H5ZM5 13.3333V10H35V13.3333H5Z" fill="#FFEBCC"/>
          </svg>
        </button>
      </header>

      <div className="weight-content">
        <h1 className="weight-title">Peso</h1>

        <div className="weight-pet-card">
          <div className="weight-pet-image">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/c0d398ff43481862c5b61660bc80ecbafd568134?width=222" alt="Bella" />
          </div>
          <div className="weight-pet-name">Bella</div>
        </div>

        <div className="weight-form-card">
          <h2 className="weight-form-title">
            El peso de tu macotas <span className="required">*</span>
          </h2>
          <div className="weight-input-wrapper">
            <input type="text" className="weight-input" />
          </div>

          <h2 className="weight-form-title">
            Notas  <span className="required">*</span>
          </h2>
          <div className="weight-input-wrapper">
            <input type="text" placeholder="Agregar  nota" className="weight-input" />
          </div>

          <h2 className="weight-form-title">
            Pesado  en  <span className="required">*</span>
          </h2>
          <div className="weight-input-wrapper date-input">
            <span>18 de Nov 2025 11: 51</span>
            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.1826 4.0282H23.1615V3.02118C23.1615 2.7541 23.0554 2.49796 22.8666 2.30911C22.6777 2.12026 22.4216 2.01416 22.1545 2.01416C21.8874 2.01416 21.6313 2.12026 21.4424 2.30911C21.2536 2.49796 21.1475 2.7541 21.1475 3.02118V4.0282H11.0772V3.02118C11.0772 2.7541 10.9711 2.49796 10.7823 2.30911C10.5934 2.12026 10.3373 2.01416 10.0702 2.01416C9.80314 2.01416 9.547 2.12026 9.35815 2.30911C9.1693 2.49796 9.0632 2.7541 9.0632 3.02118V4.0282H6.04214C5.50798 4.0282 4.9957 4.2404 4.61799 4.6181C4.24028 4.99581 4.02809 5.50809 4.02809 6.04225V26.1827C4.02809 26.7168 4.24028 27.2291 4.61799 27.6068C4.9957 27.9845 5.50798 28.1967 6.04214 28.1967H26.1826C26.7167 28.1967 27.229 27.9845 27.6067 27.6068C27.9844 27.2291 28.1966 26.7168 28.1966 26.1827V6.04225C28.1966 5.50809 27.9844 4.99581 27.6067 4.6181C27.229 4.2404 26.7167 4.0282 26.1826 4.0282Z" fill="#C48CB6"/>
            </svg>
          </div>

          <div className="weight-form-actions">
            <button className="weight-btn-cancel">Cancelar</button>
            <button className="weight-btn-save">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.71 9.29L14.71 3.29C14.6178 3.20005 14.5092 3.12874 14.39 3.08C14.2659 3.02983 14.1338 3.00272 14 3H6C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6V18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18V10C21.0008 9.86839 20.9755 9.73793 20.9258 9.61609C20.876 9.49426 20.8027 9.38344 20.71 9.29ZM9 5H13V7H9V5ZM15 19H9V16C9 15.7348 9.10536 15.4804 9.29289 15.2929C9.48043 15.1054 9.73478 15 10 15H14C14.2652 15 14.5196 15.1054 14.7071 15.2929C14.8946 15.4804 15 15.7348 15 16V19ZM19 18C19 18.2652 18.8946 18.5196 18.7071 18.7071C18.5196 18.8946 18.2652 19 18 19H17V16C17 15.2044 16.6839 14.4413 16.1213 13.8787C15.5587 13.3161 14.7956 13 14 13H10C9.20435 13 8.44129 13.3161 7.87868 13.8787C7.31607 14.4413 7 15.2044 7 16V19H6C5.73478 19 5.48043 18.8946 5.29289 18.7071C5.10536 18.5196 5 18.2652 5 18V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5H7V8C7 8.26522 7.10536 8.51957 7.29289 8.70711C7.48043 8.89464 7.73478 9 8 9H14C14.2652 9 14.5196 8.89464 14.7071 8.70711C14.8946 8.51957 15 8.26522 15 8V6.41L19 10.41V18Z" fill="#F4F4F4"/>
              </svg>
              <span>Guardar<br/>Horario</span>
            </button>
          </div>
        </div>
      </div>

      <nav className="weight-nav">
        <div className="weight-nav-item active">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.6667 14.9998L20 1.6665L3.33334 14.9998V18.3332H6.66668V34.9998H15V28.3332C15 27.0071 15.5268 25.7353 16.4645 24.7976C17.4022 23.86 18.6739 23.3332 20 23.3332C21.3261 23.3332 22.5979 23.86 23.5356 24.7976C24.4733 25.7353 25 27.0071 25 28.3332V34.9998H33.3334V18.3332H36.6667V14.9998Z" fill="#FFEBCC"/>
          </svg>
          <span>    Inicio</span>
        </div>
        <div className="weight-nav-item">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33.125 12.8125C32.3215 12.8125 31.5361 13.0508 30.868 13.4972C30.1999 13.9436 29.6792 14.578 29.3717 15.3203C29.0643 16.0627 28.9838 16.8795 29.1406 17.6676C29.2973 18.4556 29.6842 19.1795 30.2524 19.7476C30.8205 20.3158 31.5444 20.7027 32.3324 20.8594C33.1205 21.0162 33.9373 20.9357 34.6797 20.6283C35.422 20.3208 36.0565 19.8001 36.5028 19.132C36.9492 18.4639 37.1875 17.6785 37.1875 16.875C37.1875 15.7976 36.7595 14.7642 35.9976 14.0024C35.2358 13.2405 34.2024 12.8125 33.125 12.8125Z" fill="#FFEBCC"/>
          </svg>
          <span>Mascotas</span>
        </div>
      </nav>
    </div>
  );
}

export default WeightLayout;
