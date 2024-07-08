import { useEffect, useState } from "react";
import { getAllCategoriesEntriesByUser } from "../lib/appwrite";

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategoriesEntriesByUser();
        setCategories(categoriesData); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return categories;
};

export default useCategories;
