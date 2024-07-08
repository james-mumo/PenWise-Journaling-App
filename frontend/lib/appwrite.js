import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../context/GlobalProvider";

// all categories user has created
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

// function to get total journal entries created by user per category
export const getAllCategoriesEntriesByUserTotalCount = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");

    if (!token) {
      throw new Error("User token not found");
    }

    const response = await axios.get(
      `${BASE_URL}/category-entries/count/each`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

// getAllJournalEntriesByUser function
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

// function to sign in a user
export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

    const { accessToken, refreshToken } = response.data;

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

// get the logged-in use details
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

// function for loggin out a user
export const signOut = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
  } catch (error) {
    throw new Error("Failed to sign out");
  }
};

// seaching for a specific journal entry based on a search term {not implemented in the backend yet }
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

// creating a new journal entry
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

// creating a new journal category
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

// deeting a journal entry
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

// updating loggedin user details
export const updateUserDetails = async (
  currentPassword,
  newPassword,
  email,
  username
) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");

    if (!token) {
      throw new Error("User token not found");
    }

    const response = await axios.put(
      `${BASE_URL}/auth/update`,
      {
        currentPassword,
        newPassword,
        email,
        username,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating user details:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to update user details"
    );
  }
};
