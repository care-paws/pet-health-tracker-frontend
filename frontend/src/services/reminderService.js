// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Create a reminder for an event
 * @param {Object} reminderData - Reminder data
 * @param {string} reminderData.eventId - Event UUID
 * @param {string} reminderData.triggerTime - ISO 8601 datetime for reminder trigger
 * @param {string} reminderData.description - Reminder description (optional)
 * @param {string} reminderData.eventUrl - Event URL (optional)
 * @returns {Promise<Object>} Created reminder data
 */
export const createReminder = async reminderData => {
  try {
    // Build payload without null values
    const payload = {
      eventId: reminderData.eventId,
      triggerTime: reminderData.triggerTime,
    };

    // Only add optional fields if they have actual values
    if (reminderData.description) {
      payload.description = reminderData.description;
    }
    if (reminderData.eventUrl) {
      payload.eventUrl = reminderData.eventUrl;
    }

    const response = await fetch(`${API_BASE_URL}/api/reminders`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const reminder = await response.json();
      return { success: true, reminder };
    }

    const errorData = await response.json().catch(() => ({ message: "Error al crear recordatorio" }));
    throw new Error(errorData.message || JSON.stringify(errorData) || "Error al crear recordatorio");
  } catch (error) {
    console.error("Create reminder error:", error);
    throw error;
  }
};

/**
 * Get all reminders for a specific event
 * @param {string} eventId - Event UUID
 * @returns {Promise<Object>} Reminders data
 */
export const getEventReminders = async eventId => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reminders/${eventId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      const reminders = await response.json();
      return { success: true, reminders: Array.isArray(reminders) ? reminders : [] };
    }

    if (response.status === 401) {
      throw new Error("Por favor, inicia sesión para ver los recordatorios");
    }

    if (response.status === 404) {
      return { success: true, reminders: [] };
    }

    throw new Error("Error al cargar recordatorios");
  } catch (error) {
    console.error("Get event reminders error:", error);
    throw error;
  }
};

/**
 * Delete a specific reminder
 * @param {string} reminderId - Reminder UUID
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteReminder = async reminderId => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reminders/${reminderId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      return { success: true };
    }

    throw new Error("Error al eliminar recordatorio");
  } catch (error) {
    console.error("Delete reminder error:", error);
    throw error;
  }
};

/**
 * Delete all reminders for a specific event
 * @param {string} eventId - Event UUID
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteEventReminders = async eventId => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reminders/event/${eventId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      return { success: true };
    }

    throw new Error("Error al eliminar recordatorios del evento");
  } catch (error) {
    console.error("Delete event reminders error:", error);
    throw error;
  }
};

