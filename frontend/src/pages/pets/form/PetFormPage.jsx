import { dogIllustration, pawPattern, petBird, petCat, petDog, petHamster, petRabbit, petTurtle } from "@/assets/images/images";
import logoUrl from "@/assets/logo.svg";
import { calculateAge, createPet, mapPetTypeToSpecies } from "@/services/petService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        // For now, navigate back to create_pet page
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
    <div className={styles["petFormPage"]}>
      {/* Header */}
      <header className={styles["petFormPage__header"]}>
        <div className={styles["petFormPage__logo"]}>
          <img src={logoUrl} alt="App logo" width={104} height={66} />
        </div>
        <button className={styles["petFormPage__backButton"]} onClick={handleBack} aria-label="Back">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#C48CB6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </header>

      {/* Hero Image with Paw Pattern */}
      <div className={styles["petFormPage__hero"]}>
        <img src={pawPattern} alt="" className={styles["petFormPage__patternBg"]} />
        <img src={dogIllustration} alt="Dog and Cat" className={styles["petFormPage__heroImage"]} />
      </div>

      {/* Main Content - Scrollable Form */}
      <main className={styles["petFormPage__main"]}>
        <form className={styles["petForm"]} onSubmit={handleSubmit}>
          {/* Error Message */}
          {error && <div className={styles["petForm__errorMessage"]}>{error}</div>}

          {/* Name Field */}
          <div className={styles["petForm__field"]}>
            <label className={styles["petForm__label"]}>
              Nombre <span className={styles["petForm__required"]}>*</span>
            </label>
            <input
              type="text"
              className={styles["petForm__input"]}
              placeholder="Ej Max"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Birth Date Field */}
          <div className={styles["petForm__field"]}>
            <label className={styles["petForm__label"]}>
              Fecha de nacimiento <span className={styles["petForm__required"]}>*</span>
            </label>
            <input
              type="date"
              className={styles["petForm__input"]}
              value={formData.birthDate}
              onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
              required
            />
          </div>

          {/* Gender Selection */}
          <div className={styles["petForm__field"]}>
            <div className={styles["petForm__gender"]}>
              <label className={styles["petForm__genderOption"]}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={e => setFormData({ ...formData, gender: e.target.value })}
                />
                <span>Hembra ♀</span>
              </label>
              <label className={styles["petForm__genderOption"]}>
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
          <div className={styles["petForm__field"]}>
            <label className={styles["petForm__label"]}>
              El peso de tu mascotas <span className={styles["petForm__required"]}>*</span>
            </label>
            <input
              type="text"
              className={styles["petForm__input"]}
              placeholder="Eje 3 kilogramos"
              value={formData.weight}
              onChange={e => setFormData({ ...formData, weight: e.target.value })}
              required
            />
          </div>

          {/* Pet Type Field */}
          <div className={styles["petForm__field"]}>
            <label className={styles["petForm__label"]}>
              Elige un tipo de mascota <span className={styles["petForm__required"]}>*</span>
            </label>
            <div className={styles["petTypesGrid"]}>
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
                  className={`${styles["petTypeCard"]} ${formData.petType === pet.id ? styles["petTypeCardselected"] : ""}`}
                  onClick={() => setFormData({ ...formData, petType: pet.id })}
                >
                  <div className={styles["petTypeCard__image"]}>
                    <img src={pet.image} alt={pet.name} />
                  </div>
                  <div className={styles["petTypeCard__label"]}>{pet.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Breed Field */}
          <div className={styles["petForm__field"]}>
            <label className={styles["petForm__label"]}>Raza</label>
            <input
              type="text"
              className={styles["petForm__input"]}
              placeholder="Raza de tu mascota"
              value={formData.breed}
              onChange={e => setFormData({ ...formData, breed: e.target.value })}
            />
          </div>

          {/* Color Field */}
          <div className={styles["petForm__field"]}>
            <label className={styles["petForm__label"]}>Color</label>
            <input
              type="text"
              className={styles["petForm__input"]}
              placeholder="Color de tu mascota"
              value={formData.color}
              onChange={e => setFormData({ ...formData, color: e.target.value })}
            />
          </div>

          {/* Photo Upload Section */}
          <div className={styles["petForm__field"]}>
            <div className={styles["petForm__uploadSection"]}>
              <h3 className={styles["petForm__uploadTitle"]}>
                Subir foto de tu mascota <span className={styles["petForm__required"]}>*</span>
              </h3>
              <p className={styles["petForm__uploadSubtitle"]}>Actualiza las fotografías de tu mascota</p>
              <label htmlFor="photo_upload" className={styles["petForm__uploadArea"]}>
                {formData.photo ? (
                  <div className={styles["petForm__photoPreview"]}>
                    <img src={URL.createObjectURL(formData.photo)} alt="Preview" className={styles["petForm__previewImage"]} />
                    <p className={styles["petForm__photoName"]}>{formData.photo.name}</p>
                  </div>
                ) : (
                  <>
                    <p>Haz clic o arrastra una imagen aquí</p>
                    <p className={styles["petForm__uploadInfo"]}>PNG, JPG O WEBP (máx. 10MB)</p>
                  </>
                )}
              </label>
              <input
                id="photo_upload"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                className={styles["petForm__fileInput"]}
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
          <div className={styles["petForm__actions"]}>
            <button type="button" className={styles["petForm__cancelButton"]} onClick={handleCancel} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className={styles["petForm__saveButton"]} disabled={loading}>
              {loading ? "Guardando..." : "💾 Guardar"}
            </button>
          </div>
        </form>
      </main>

      {/* Footer Navigation Bar */}
      <footer className={styles["petFormPage__footer"]}></footer>
    </div>
  );
}

export default PetFormPage;
