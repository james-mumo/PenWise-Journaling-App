import { Request, Response } from "express";
import Category from "../models/Category";
import { CategoryInterface } from "../types/index";

// function to create a new category
export const createCategory = async (req: Request, res: Response) => {
  const { name, color, isEditable }: CategoryInterface = req.body;
  const userId = req.user.userId;

  try {
    const category: CategoryInterface = await Category.create(
      name,
      color,
      userId,
      isEditable
    );
    res.status(201).json(category);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// function to get category based on the id
export const getCategoryById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const category: CategoryInterface | null = await Category.findById(id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

//  function to update a category
export const updateCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, color, isEditable }: Partial<CategoryInterface> = req.body;

  if (
    !name ||
    typeof name !== "string" ||
    !color ||
    typeof color !== "string" ||
    isEditable === undefined
  ) {
    return res
      .status(400)
      .json({ message: "Invalid data provided for update" });
  }

  try {
    const updatedCategory: CategoryInterface | null = await Category.update(
      id,
      name,
      color,
      isEditable
    );
    if (updatedCategory) {
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

//  function to delete a category
export const deleteCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await Category.delete(id);
    res.json({ message: "Category deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// function to get all categories based on id
export const getAllCategoriesByUserId = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ message: "User id not found in token" });
  }

  try {
    const categories: CategoryInterface[] = await Category.findAllByUserId(
      userId
    );
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// function to get all categories belonging to a user with their entry counts
export const getAllCategoriesByUserIdCount = async (
  req: Request,
  res: Response
) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ message: "User id not found in token" });
  }

  try {
    const categories = await Category.getCategoriesWithEntryCount(userId);
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
