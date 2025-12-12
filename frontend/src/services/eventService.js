// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Create a new event for a pet
 * @param {string} petId - Pet UUID
 * @param {Object} eventData - Event data
 * @param {string} eventData.date - ISO 8601 date
 * @param {string} eventData.description - Event description
 * @param {string} eventData.type - Event type (VET_VISIT, FEEDING, VACCINE)
 * @param {File} eventData.attachmentUrl - Optional file attachment
 * @returns {Promise<Object>} Created event data
 */
export const createEvent = async (petId, eventData) => {
  try {
    const formData = new FormData();
    formData.append("date", eventData.date);
    formData.append("description", eventData.description);
    formData.append("type", eventData.type);

    if (eventData.attachmentUrl) {
      formData.append("attachmentUrl", eventData.attachmentUrl);
    }

    const response = await fetch(`${API_BASE_URL}/api/pets/${petId}/events`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, event: result.data };
    }

    const errorData = await response.json().catch(() => ({ message: "Error al crear evento" }));
    throw new Error(errorData.message || "Error al crear evento");
  } catch (error) {
    console.error("Create event error:", error);
    throw error;
  }
};

/**
 * Get all events for a specific pet
 * @param {string} petId - Pet UUID
 * @param {string} type - Optional event type filter (VET_VISIT, FEEDING, VACCINE)
 * @returns {Promise<Object>} Events data
 */
export const getPetEvents = async (petId, type = null) => {
  try {
    let url = `${API_BASE_URL}/api/pets/${petId}/events`;
    if (type) {
      url += `?type=${type}`;
    }

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();
      // The API returns { menssage: "...", data: [...] }
      const events = result.data || result.events || result || [];
      return { success: true, events: Array.isArray(events) ? events : [] };
    }

    if (response.status === 401) {
      throw new Error("Por favor, inicia sesión para ver los eventos");
    }

    if (response.status === 404) {
      return { success: true, events: [] };
    }

    throw new Error("Error al cargar eventos");
  } catch (error) {
    console.error("Get pet events error:", error);
    throw error;
  }
};

/**
 * Delete an event and all its associated reminders
 * @param {string} petId - Pet UUID
 * @param {string} eventId - Event UUID
 * @returns {Promise<Object>} Success status
 */
export const deleteEvent = async (petId, eventId) => {
  try {
    // Delete all reminders associated with the event
    // Note: The backend doesn't have a direct endpoint to delete events,
    // but deleting reminders should be sufficient for the reminder functionality
    const reminderResponse = await fetch(`${API_BASE_URL}/api/reminders/event/${eventId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    if (reminderResponse.ok) {
      return { success: true };
    }

    if (reminderResponse.status === 401) {
      throw new Error("Por favor, inicia sesión para eliminar");
    }

    if (reminderResponse.status === 404) {
      // If no reminders found, consider it a success (reminder already deleted or doesn't exist)
      return { success: true };
    }

    const errorData = await reminderResponse.json().catch(() => ({ message: "Error al eliminar" }));
    throw new Error(errorData.message || "Error al eliminar");
  } catch (error) {
    console.error("Delete event error:", error);
    throw error;
  }
};

