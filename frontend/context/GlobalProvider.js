import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const BASE_URL = "https://143e-196-216-86-89.ngrok-free.app/api";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");

        if (token) {
          const currentUser = await getCurrentUser(token);
          setIsLogged(true);
          setUser(currentUser);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking current user:", error);
      } finally {
        setLoading(false);
      }
    };

    checkCurrentUser();
  }, []);

  // function to verify loggedin in user token if no token present redirect to sign in
  const getCurrentUser = async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw new Error("Failed to fetch current user details");
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
