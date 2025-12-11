// Base API URL - Update this to match your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.email - User email
 * @param {string} userData.password - User password
 * @returns {Promise<Object>} Response data
 */
export const register = async userData => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
      credentials: "include", // Include cookies in request
    });

    // Handle text response (API returns "User registered." as text)
    if (response.ok) {
      const text = await response.text();
      return { success: true, message: text };
    }

    // Handle error responses
    const errorData = await response.json().catch(() => ({ message: "Registration failed" }));

    // Handle validation errors from backend
    if (errorData.errors && errorData.errors.fieldErrors) {
      const fieldErrors = errorData.errors.fieldErrors;
      const errorMessages = [];

      if (fieldErrors.email) {
        errorMessages.push(`Email: ${fieldErrors.email.join(", ")}`);
      }
      if (fieldErrors.password) {
        errorMessages.push(`Contraseña: ${fieldErrors.password.join(", ")}`);
      }

      if (errorMessages.length > 0) {
        throw new Error(errorMessages.join(". "));
      }
    }

    throw new Error(errorData.message || "Registration failed");
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

/**
 * Login user
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} User data
 */
export const login = async credentials => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
      credentials: "include", // Include cookies in request
    });

    if (response.ok) {
      const userData = await response.json();
      return { success: true, user: userData };
    }

    // Handle error responses
    const errorData = await response.json().catch(() => ({ message: "Login failed" }));

    // Handle validation errors from backend
    if (errorData.errors && errorData.errors.fieldErrors) {
      const fieldErrors = errorData.errors.fieldErrors;
      const errorMessages = [];

      if (fieldErrors.email) {
        errorMessages.push(`Email: ${fieldErrors.email.join(", ")}`);
      }
      if (fieldErrors.password) {
        errorMessages.push(`Contraseña: ${fieldErrors.password.join(", ")}`);
      }

      if (errorMessages.length > 0) {
        throw new Error(errorMessages.join(". "));
      }
    }

    if (response.status === 404) {
      throw new Error("Usuario no encontrado o contraseña incorrecta");
    }

    if (response.status === 429) {
      throw new Error("Demasiados intentos. Por favor, intenta más tarde");
    }

    throw new Error(errorData.message || "Error al iniciar sesión");
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/**
 * Logout user
 * @returns {Promise<Object>} Logout confirmation
 */
export const logout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      return { success: true };
    }

    throw new Error("Error al cerrar sesión");
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

/**
 * Get current authenticated user
 * @returns {Promise<Object>} Current user data
 */
export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/currentUser`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      const userData = await response.json();
      return { success: true, user: userData };
    }

    if (response.status === 401) {
      return { success: false, user: null };
    }

    throw new Error("Error al obtener usuario");
  } catch (error) {
    console.error("Get current user error:", error);
    throw error;
  }
};
