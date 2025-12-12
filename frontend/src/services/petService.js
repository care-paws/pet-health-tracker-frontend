// Base API URL - Update this to match your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Create a new pet
 * @param {Object} petData - Pet data
 * @param {string} petData.name - Pet name
 * @param {string} petData.species - Pet species (e.g., "Perro", "Gato")
 * @param {string} petData.breed - Pet breed
 * @param {string} petData.age - Birthdate as ISO string
 * @param {string} petData.gender - male | female
 * @param {number} petData.weight - Pet weight in kilograms
 * @param {string} [petData.weighedAt] - ISO datetime of last weigh
 * @param {string} [petData.notes] - Additional notes
 * @param {File} petData.photoUrl - Pet photo file (required)
 * @returns {Promise<Object>} Created pet data
 */
export const createPet = async petData => {
  try {
    const formData = new FormData();

    // Append all fields to FormData
    formData.append("name", petData.name);
    formData.append("species", petData.species);
    formData.append("breed", petData.breed || "");
    formData.append("gender", petData.gender);
    formData.append("age", petData.age); // ISO string
    formData.append("weight", petData.weight.toString());
    if (petData.weighedAt) {
      formData.append("weighedAt", petData.weighedAt);
    }
    if (petData.notes) {
      formData.append("notes", petData.notes);
    }

    // Append photo (required)
    if (!petData.photoUrl) throw new Error("La foto es obligatoria");
    formData.append("photoUrl", petData.photoUrl);

    const response = await fetch(`${API_BASE_URL}/api/pets`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
      credentials: "include", // Include cookies for authentication
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, pet: result.data, message: result.message };
    }

    // Handle error responses
    const errorData = await response.json().catch(() => ({ message: "Error al crear mascota" }));

    // Handle validation errors from backend
    if (errorData.errors && errorData.errors.fieldErrors) {
      const fieldErrors = errorData.errors.fieldErrors;
      const errorMessages = [];

      if (fieldErrors.name) {
        errorMessages.push(`Nombre: ${fieldErrors.name.join(", ")}`);
      }
      if (fieldErrors.species) {
        errorMessages.push(`Especie: ${fieldErrors.species.join(", ")}`);
      }
      if (fieldErrors.breed) {
        errorMessages.push(`Raza: ${fieldErrors.breed.join(", ")}`);
      }
      if (fieldErrors.age) {
        errorMessages.push(`Edad: ${fieldErrors.age.join(", ")}`);
      }
      if (fieldErrors.weight) {
        errorMessages.push(`Peso: ${fieldErrors.weight.join(", ")}`);
      }
      if (fieldErrors.photoUrl) {
        errorMessages.push(`Foto: ${fieldErrors.photoUrl.join(", ")}`);
      }

      if (errorMessages.length > 0) {
        throw new Error(errorMessages.join(". "));
      }
    }

    // Handle specific error messages
    if (response.status === 400 && errorData.message.includes("nombre")) {
      throw new Error("Ya tienes una mascota registrada con ese nombre");
    }

    if (response.status === 401) {
      throw new Error("Debes iniciar sesión para crear una mascota");
    }

    if (response.status === 413) {
      throw new Error("La imagen es demasiado grande. Máximo 10MB");
    }

    if (response.status === 429) {
      throw new Error("Demasiadas solicitudes. Por favor, intenta más tarde");
    }

    throw new Error(errorData.message || "Error al crear mascota");
  } catch (error) {
    console.error("Create pet error:", error);
    throw error;
  }
};

/**
 * Get all pets for the authenticated user
 * @returns {Promise<Object>} List of pets
 */
export const getPets = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pets`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, pets: result.data };
    }

    if (response.status === 401) {
      throw new Error("Debes iniciar sesión para ver tus mascotas");
    }

    throw new Error("Error al obtener mascotas");
  } catch (error) {
    console.error("Get pets error:", error);
    throw error;
  }
};

/**
 * Get a specific pet by ID
 * @param {string} petId - Pet ID
 * @returns {Promise<Object>} Pet data
 */
export const getPetById = async petId => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pets/${petId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, pet: result.data };
    }

    if (response.status === 401) {
      throw new Error("Debes iniciar sesión");
    }

    if (response.status === 404) {
      throw new Error("Mascota no encontrada");
    }

    throw new Error("Error al obtener mascota");
  } catch (error) {
    console.error("Get pet by ID error:", error);
    throw error;
  }
};

/**
 * Calculate age from birth date
 * @param {string} birthDate - Birth date in YYYY-MM-DD format
 * @returns {number} Age in years
 */
export const calculateAge = birthDate => {
  if (!birthDate) return 0;
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

/**
 * Map pet type ID to species name
 * @param {string} petTypeId - Pet type ID (e.g., "dog", "cat")
 * @returns {string} Species name (e.g., "Perro", "Gato")
 */
export const mapPetTypeToSpecies = petTypeId => {
  const speciesMap = {
    dog: "Perro",
    cat: "Gato",
    bird: "Loro",
    rabbit: "Conejo",
    hamster: "Cobayo",
    turtle: "Tortuga",
  };
  return speciesMap[petTypeId] || petTypeId;
};
