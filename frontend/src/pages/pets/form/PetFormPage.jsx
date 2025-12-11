import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dogIllustration, pawPattern, petBird, petCat, petDog, petHamster, petRabbit, petTurtle } from "../../../assets/images/images";
import logoUrl from "../../assets/logo.svg";
import { calculateAge, createPet, mapPetTypeToSpecies } from "../../../services/petService";
import styles from "./PetFormPage.module.css";

function PetFormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    gender: "",
    weight: "",
    petType: "",
    breed: "",
    color: "",
    photo: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    navigate("/create-pet");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.birthDate || !formData.weight || !formData.petType) {
        throw new Error("Por favor completa todos los campos requeridos");
      }

      if (!formData.photo) {
        throw new Error("Por favor selecciona una foto de tu mascota");
      }

      // Calculate age from birth date
      const age = calculateAge(formData.birthDate);
      if (age < 0) {
        throw new Error("La fecha de nacimiento no puede ser en el futuro");
      }

      // Convert weight to number
      const weight = parseFloat(formData.weight);
      if (isNaN(weight) || weight <= 0) {
        throw new Error("Por favor ingresa un peso válido");
      }

      // Map pet type to species
      const species = mapPetTypeToSpecies(formData.petType);

      // Prepare pet data
      const petData = {
        name: formData.name,
        species: species,
        breed: formData.breed || species, // Use species as breed if not provided
        age: age,
        weight: weight,
        photoUrl: formData.photo,
      };

      // Create pet
      const result = await createPet(petData);

      if (result.success) {
        console.log("Pet created successfully:", result.pet);
        // Navigate to a success page or pets list
        // For now, navigate back to create-pet page
        navigate("/create-pet");
      }
    } catch (err) {
      setError(err.message || "Error al crear mascota. Por favor, intenta de nuevo.");
      console.error("Create pet error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/create-pet");
  };

  return (
    <div className={styles["pet-form-page"]}>
      {/* Header */}
      <header className={styles["pet-form-page__header"]}>
        <div className={styles["pet-form-page__logo"]}>
          <img src={logoUrl} alt="App logo" width={104} height={66} />
        </div>
        <button className={styles["pet-form-page__back-button"]} onClick={handleBack} aria-label="Back">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#C48CB6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </header>

      {/* Hero Image with Paw Pattern */}
      <div className={styles["pet-form-page__hero"]}>
        <img src={pawPattern} alt="" className={styles["pet-form-page__pattern-bg"]} />
        <img src={dogIllustration} alt="Dog and Cat" className={styles["pet-form-page__hero-image"]} />
      </div>

      {/* Main Content - Scrollable Form */}
      <main className={styles["pet-form-page__main"]}>
        <form className={styles["pet-form"]} onSubmit={handleSubmit}>
          {/* Error Message */}
          {error && <div className={styles["pet-form__error-message"]}>{error}</div>}

          {/* Name Field */}
          <div className={styles["pet-form__field"]}>
            <label className={styles["pet-form__label"]}>
              Nombre <span className={styles["pet-form__required"]}>*</span>
            </label>
            <input
              type="text"
              className={styles["pet-form__input"]}
              placeholder="Ej Max"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Birth Date Field */}
          <div className={styles["pet-form__field"]}>
            <label className={styles["pet-form__label"]}>
              Fecha de nacimiento <span className={styles["pet-form__required"]}>*</span>
            </label>
            <input
              type="date"
              className={styles["pet-form__input"]}
              value={formData.birthDate}
              onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
              required
            />
          </div>

          {/* Gender Selection */}
          <div className={styles["pet-form__field"]}>
            <div className={styles["pet-form__gender"]}>
              <label className={styles["pet-form__gender-option"]}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={e => setFormData({ ...formData, gender: e.target.value })}
                />
                <span>Hembra ♀</span>
              </label>
              <label className={styles["pet-form__gender-option"]}>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={e => setFormData({ ...formData, gender: e.target.value })}
                />
                <span>Macho ♂</span>
              </label>
            </div>
          </div>

          {/* Weight Field */}
          <div className={styles["pet-form__field"]}>
            <label className={styles["pet-form__label"]}>
              El peso de tu mascotas <span className={styles["pet-form__required"]}>*</span>
            </label>
            <input
              type="text"
              className={styles["pet-form__input"]}
              placeholder="Eje 3 kilogramos"
              value={formData.weight}
              onChange={e => setFormData({ ...formData, weight: e.target.value })}
              required
            />
          </div>

          {/* Pet Type Field */}
          <div className={styles["pet-form__field"]}>
            <label className={styles["pet-form__label"]}>
              Elige un tipo de mascota <span className={styles["pet-form__required"]}>*</span>
            </label>
            <div className={styles["pet-types-grid"]}>
              {[
                { id: "turtle", name: "Tortuga", image: petTurtle },
                { id: "hamster", name: "Cobayo", image: petHamster },
                { id: "bird", name: "Loro", image: petBird },
                { id: "cat", name: "Gato", image: petCat },
                { id: "dog", name: "Perro", image: petDog },
                { id: "rabbit", name: "Conejo", image: petRabbit },
              ].map(pet => (
                <div
                  key={pet.id}
                  className={`${styles["pet-type-card"]} ${formData.petType === pet.id ? styles["pet-type-card--selected"] : ""}`}
                  onClick={() => setFormData({ ...formData, petType: pet.id })}
                >
                  <div className={styles["pet-type-card__image"]}>
                    <img src={pet.image} alt={pet.name} />
                  </div>
                  <div className={styles["pet-type-card__label"]}>{pet.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Breed Field */}
          <div className={styles["pet-form__field"]}>
            <label className={styles["pet-form__label"]}>Raza</label>
            <input
              type="text"
              className={styles["pet-form__input"]}
              placeholder="Raza de tu mascota"
              value={formData.breed}
              onChange={e => setFormData({ ...formData, breed: e.target.value })}
            />
          </div>

          {/* Color Field */}
          <div className={styles["pet-form__field"]}>
            <label className={styles["pet-form__label"]}>Color</label>
            <input
              type="text"
              className={styles["pet-form__input"]}
              placeholder="Color de tu mascota"
              value={formData.color}
              onChange={e => setFormData({ ...formData, color: e.target.value })}
            />
          </div>

          {/* Photo Upload Section */}
          <div className={styles["pet-form__field"]}>
            <div className={styles["pet-form__upload-section"]}>
              <h3 className={styles["pet-form__upload-title"]}>
                Subir foto de tu mascota <span className={styles["pet-form__required"]}>*</span>
              </h3>
              <p className={styles["pet-form__upload-subtitle"]}>Actualiza las fotografías de tu mascota</p>
              <label htmlFor="photo-upload" className={styles["pet-form__upload-area"]}>
                {formData.photo ? (
                  <div className={styles["pet-form__photo-preview"]}>
                    <img src={URL.createObjectURL(formData.photo)} alt="Preview" className={styles["pet-form__preview-image"]} />
                    <p className={styles["pet-form__photo-name"]}>{formData.photo.name}</p>
                  </div>
                ) : (
                  <>
                    <p>Haz clic o arrastra una imagen aquí</p>
                    <p className={styles["pet-form__upload-info"]}>PNG, JPG O WEBP (máx. 10MB)</p>
                  </>
                )}
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                className={styles["pet-form__file-input"]}
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // Validate file size (10MB max)
                    if (file.size > 10 * 1024 * 1024) {
                      setError("La imagen es demasiado grande. Máximo 10MB");
                      return;
                    }
                    setFormData({ ...formData, photo: file });
                    setError(""); // Clear any previous errors
                  }
                }}
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles["pet-form__actions"]}>
            <button type="button" className={styles["pet-form__cancel-button"]} onClick={handleCancel} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className={styles["pet-form__save-button"]} disabled={loading}>
              {loading ? "Guardando..." : "💾 Guardar"}
            </button>
          </div>
        </form>
      </main>

      {/* Footer Navigation Bar */}
      <footer className={styles["pet-form-page__footer"]}></footer>
    </div>
  );
}

export default PetFormPage;
