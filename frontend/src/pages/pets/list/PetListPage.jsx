import {
  cameraIcon,
  femaleIcon,
  healthButtonIcon,
  healthIcon,
  maleIcon,
  reminderButtonIcon,
  reminderIcon,
  weightButtonIcon,
  weightIcon,
} from "@/assets/icons/icons";
import { backgroundPet, dogIllustration } from "@/assets/images/images";
import logoUrl from "@/assets/logo.svg";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import PageLayout from "@/layouts/PageLayout";
import { calculateAge, getPets } from "@/services/petService";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./PetListPage.module.css";

function PetListPage() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getPets();
      setPets(result.pets || []);
    } catch (err) {
      console.error("Error fetching pets:", err);
      const errorMessage = err.message || "Error al cargar las mascotas";
      setError(errorMessage);

      // If unauthorized, redirect to login
      if (err.message.includes("iniciar sesión")) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddPet = () => {
    navigate("/pet-form");
  };

  const getAgeDisplay = birthDate => {
    if (!birthDate) return "0 días";

    const today = new Date();
    const birth = new Date(birthDate);
    const diffTime = Math.abs(today - birth);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Si tiene menos de 30 días, mostrar en días
    if (diffDays < 30) {
      return diffDays === 1 ? "1 día" : `${diffDays} días`;
    }

    // Si tiene menos de 365 días, mostrar en meses
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return months === 1 ? "1 mes" : `${months} meses`;
    }

    // Si tiene 1 año o más, mostrar en años
    const years = calculateAge(birthDate);
    return years === 1 ? "1 año" : `${years} años`;
  };

  const formatWeight = weight => {
    return weight ? `${weight} kg` : "0 kg";
  };

  const header = (
    <div className={styles["petListPage__headerWrap"]}>
      <AppHeader className={styles["petListPage__header"]} showBackButton={false} showMenuButton={true} centerAlign="start">
        <Link to="/">
          <img src={logoUrl} alt="Care Paws" width={110} height={70} />
        </Link>
      </AppHeader>
    </div>
  );

  const footer = <AppFooter />;

  // Redirect to create pet page if no pets and not loading
  useEffect(() => {
    if (!loading && pets.length === 0 && !error) {
      navigate("/create-pet");
    }
  }, [loading, pets, error, navigate]);

  return (
    <PageLayout className={styles["petListPage"]} header={header} footer={footer}>
      <main className={styles["petListPage__main"]}>
        {/* Add Pet Button */}
        <button className={styles["addPetButton"]} onClick={handleAddPet}>
          <span>Agregar una mascota</span>
          <svg className={styles["addPetButton__icon"]} viewBox="0 0 38 38" fill="none">
            <circle cx="19" cy="19" r="19" fill="#C570D0" fillOpacity="0.8" />
            <path d="M19 10V28M10 19H28" stroke="#FFEBCC" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </button>

        {/* Loading State */}
        {loading && (
          <div className={styles["loadingState"]}>
            <p>Cargando mascotas...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className={styles["errorState"]}>
            <p>{error}</p>
            <button onClick={fetchPets} className={styles["retryButton"]}>
              Reintentar
            </button>
          </div>
        )}

        {/* Empty State - when no pets but no error */}
        {!loading && !error && pets.length === 0 && (
          <div className={styles["errorState"]}>
            <p>No tienes mascotas registradas</p>
            <button onClick={() => navigate("/pet-form")} className={styles["retryButton"]}>
              Agregar primera mascota
            </button>
          </div>
        )}

        {/* Pet Cards */}
        {!loading &&
          !error &&
          pets.map(pet => (
            <div key={pet.id} className={styles["petCard"]}>
              <div className={styles["petCard__imageWrapper"]}>
                <div className={styles["petCard__background"]} style={{ backgroundImage: `url(${backgroundPet})` }} />
                <div className={styles["petCard__photoCircle"]}>
                  <img
                    src={pet.photoUrl}
                    alt={pet.name}
                    className={styles["petCard__photo"]}
                    onError={e => {
                      e.target.src = dogIllustration; // Fallback image
                    }}
                  />
                </div>
                <button className={styles["petCard__cameraButton"]}>
                  <div className={styles["petCard__cameraCircle"]}>
                    <img src={cameraIcon} alt="Camera" className={styles["petCard__cameraIcon"]} />
                  </div>
                </button>
              </div>

              <div className={styles["petCard__info"]}>
                {/* Gender and Details */}
                <div className={styles["petCard__details"]}>
                  {/* Gender Icon */}
                  {pet.gender === "female" ? (
                    // female icon
                    <img src={femaleIcon} alt="Female" className={styles["petCard__genderIcon"]} />
                  ) : (
                    // male icon
                    <img src={maleIcon} alt="Male" className={styles["petCard__genderIcon"]} />
                  )}
                  <div className={styles["petCard__tag"]}>{pet.name}</div>
                  <div className={styles["petCard__tag"]}>{getAgeDisplay(pet.age)}</div>
                  <div className={styles["petCard__tag"]}>{formatWeight(pet.weight)}</div>
                </div>

                {/* Stats Buttons */}
                <div className={styles["petCard__stats"]}>
                  {/* Notes Button */}
                  <button onClick={() => navigate("/reminders")} className={styles["petCard__statButton"]}>
                    {/* reminder */}
                    <img src={reminderButtonIcon} alt="Reminder" className={styles["petCard__statIcon"]} />

                    <span>{pet.notes ? "1" : "0"}</span>
                  </button>

                  {/* Vaccines Button - TODO: Get from events */}
                  <button className={styles["petCard__statButton"]}>
                    {/* health */}
                    <img src={healthButtonIcon} alt="Health" className={styles["petCard__statIcon"]} />
                    <span>0</span>
                  </button>

                  {/* Weight Button */}
                  <button className={styles["petCard__statButton"]}>
                    {/* weight */}
                    <img src={weightButtonIcon} alt="Weight" className={styles["petCard__statIcon"]} />
                    <span>{formatWeight(pet.weight)}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

        {/* Feature Cards */}
        <div className={styles["featureCards"]}>
          <div className={styles["featureCard"]}>
            <div className={styles["featureCard__content"]}>
              <h2 className={styles["featureCard__title"]}>Recordatorios</h2>
              <p className={styles["featureCard__description"]}>Activa recordatorios de vacunas, visitas y alimentación</p>
            </div>
            <div className={styles["featureCard__icon"]}>
              <img src={reminderIcon} alt="Reminder" width={48} height={48} />
            </div>
          </div>

          <div className={styles["featureCard"]}>
            <div className={styles["featureCard__content"]}>
              <h2 className={styles["featureCard__title"]}>Historial de salud</h2>
              <p className={styles["featureCard__description"]}>Registra vacunas y visitas al veterinario de tu mascota</p>
            </div>
            <div className={styles["featureCard__icon"]}>
              <img src={healthIcon} alt="Health" width={48} height={48} />
            </div>
          </div>

          <div className={styles["featureCard"]}>
            <div className={styles["featureCard__content"]}>
              <h2 className={styles["featureCard__title"]}>Peso de mascota</h2>
              <p className={styles["featureCard__description"]}>Actualiza el peso e ingresa notas de tu mascota</p>
            </div>
            <div className={styles["featureCard__icon"]}>
              <img src={weightIcon} alt="Weight" width={48} height={48} />
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}

export default PetListPage;
