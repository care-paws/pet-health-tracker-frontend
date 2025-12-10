import './CreatePetLayout.css';

function CreatePetLayout() {
  return (
    <div className="create-pet-layout">
      <header className="create-pet-header">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/b31101e4e03015bcf437a0697fd6836ba64da5ca?width=208" 
          alt="Care Paws Logo" 
          className="create-pet-logo"
        />
        <button className="create-pet-back-button">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="42" height="42" rx="10" fill="#C48CB6"/>
            <path d="M7.00001 17.4999L5.76276 18.7372L4.52551 17.4999L5.76276 16.2627L7.00001 17.4999ZM36.75 31.4999C36.75 31.9641 36.5656 32.4092 36.2374 32.7374C35.9093 33.0656 35.4641 33.2499 35 33.2499C34.5359 33.2499 34.0908 33.0656 33.7626 32.7374C33.4344 32.4092 33.25 31.9641 33.25 31.4999H36.75ZM14.5128 27.4872L5.76276 18.7372L8.23726 16.2627L16.9873 25.0127L14.5128 27.4872ZM5.76276 16.2627L14.5128 7.5127L16.9873 9.98719L8.23726 18.7372L5.76276 16.2627ZM7.00001 15.7499H24.5V19.2499H7.00001V15.7499ZM36.75 27.9999V31.4999H33.25V27.9999H36.75ZM24.5 15.7499C27.7489 15.7499 30.8647 17.0406 33.1621 19.3379C35.4594 21.6352 36.75 24.751 36.75 27.9999H33.25C33.25 25.6793 32.3281 23.4537 30.6872 21.8128C29.0463 20.1718 26.8207 19.2499 24.5 19.2499V15.7499Z" fill="#FFEBCC"/>
          </svg>
        </button>
      </header>

      <div className="create-pet-hero">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/d94bdd794c2345198cbf981b9e704d069da13b72?width=824" 
          alt="Background Pattern" 
          className="create-pet-pattern"
        />
      </div>

      <div className="create-pet-content">
        <p className="create-pet-text">
          Añade tu primer mascota haciendo clic en el botón +<br/>
          en la parte superior o el botón de abajo.
        </p>
        <button className="create-pet-button">Crear el primero</button>
      </div>
    </div>
  );
}

export default CreatePetLayout;
