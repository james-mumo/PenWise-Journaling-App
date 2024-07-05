import { Request, Response } from "express";
import Category from "../models/Category";
import { CategoryInterface } from "../types/index";

export const createCategory = async (req: Request, res: Response) => {
  const { name, color, icon, isEditable }: CategoryInterface = req.body;
  const userId = req.user.userId;

  try {
    const category: CategoryInterface = await Category.create(
      name,
      color,
      icon,
      userId,
      isEditable
    );
    res.status(201).json(category);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

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

export const updateCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, color, icon, isEditable }: Partial<CategoryInterface> =
    req.body;

  if (
    !name ||
    typeof name !== "string" ||
    !color ||
    typeof color !== "string" ||
    !icon ||
    typeof icon !== "string" ||
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
      icon,
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

export const deleteCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await Category.delete(id);
    res.json({ message: "Category deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllCategoriesByUserId = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  try {
    const categories: CategoryInterface[] = await Category.findAllByUserId(
      userId
    );
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
