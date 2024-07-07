import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../context/GlobalProvider";
// url pointing to the backend server

// all categories user has create
export const getAllCategoriesEntriesByUser = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");

    if (!token) {
      throw new Error("User token not found");
    }

    const response = await axios.get(`${BASE_URL}/category-entries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch categories"
    );
  }
};

// Define the getAllJournalEntriesByUser function
export const getAllJournalEntriesByUser = async () => {
  try {
    const token = await AsyncStorage.getItem("refreshToken");

    if (!token) {
      throw new Error("User token not found");
    }

    const response = await axios.get(`${BASE_URL}/journal-entries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch journal entries"
    );
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

    const { accessToken, refreshToken } = response.data;

    // tokens securely in AsyncStorage
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

// registering new user logic
export const registerUser = async (email, username, password) => {
  try {
    console.log(BASE_URL);
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      email,
      username,
      password,
    });

    // Check if response.data exists before accessing properties
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Empty response data");
    }
  } catch (error) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || error || "Unknown error occurred"
    );
  }
};

export const getCurrentUser = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");

    if (!token) {
      throw new Error("User token not found");
    }

    const response = await axios.get(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user details");
  }
};

export const signOut = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
  } catch (error) {
    throw new Error("Failed to sign out");
  }
};

export const searchJournalEntries = async (query) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");

    if (!token) {
      throw new Error("User token not found");
    }

    const response = await axios.get(`${BASE_URL}/journal-entries/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        query: query,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error searching journal entries:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to search journal entries"
    );
  }
};

export const createJournalEntry = async (journalEntryData) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");

    if (!token) {
      throw new Error("User token not found");
    }

    const response = await axios.post(
      `${BASE_URL}/journal-entries`,
      journalEntryData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating journal entry:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to create journal entry"
    );
  }
};

export const createCategory = async (categoryData) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");

    if (!token) {
      throw new Error("User token not found");
    }

    const response = await axios.post(
      `${BASE_URL}/category-entries`,
      categoryData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to create category"
    );
  }
};

export const deleteJournalEntry = async (entryId) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");

    if (!token) {
      throw new Error("User token not found");
    }

    const response = await axios.delete(
      `${BASE_URL}/journal-entries/${entryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting journal entry:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to delete journal entry"
    );
  }
};

// Update a journal entry by ID
export const updateJournalEntry = async (entryId, updatedData) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");

    if (!token) {
      throw new Error("User token not found");
    }

    const response = await axios.put(
      `${BASE_URL}/journal-entries/${entryId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating journal entry:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to update journal entry"
    );
  }
};
