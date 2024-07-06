import axios from "axios";

// url pointing to the backend server
const BASE_URL = process.env.BASE_URL;

// registering new user logic
export const registerUser = async (email, username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      email,
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

// log in a user function
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};
