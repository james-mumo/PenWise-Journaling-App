import { pool } from "../config/database";

class Category {
  constructor(
    public id: number,
    public name: string,
    public color: string,
    public icon: string,
    public userId: number,
    public isEditable: boolean
  ) {}

  static async create(
    name: string,
    color: string,
    icon: string,
    userId: number,
    isEditable: boolean
  ): Promise<Category> {
    const result = await pool.query(
      "INSERT INTO categories (name, color, icon, user_id, is_editable) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, color, icon, userId, isEditable]
    );

    const {
      id,
      name: dbName,
      color: dbColor,
      icon: dbIcon,
      user_id: dbUserId,
      is_editable: dbIsEditable,
    } = result.rows[0];
    return new Category(id, dbName, dbColor, dbIcon, dbUserId, dbIsEditable);
  }

  static async findById(id: number): Promise<Category | null> {
    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [
      id,
    ]);

    if (result.rows.length > 0) {
      const { id, name, color, icon, user_id, is_editable } = result.rows[0];
      return new Category(id, name, color, icon, user_id, is_editable);
    }
    return null;
  }

  static async update(
    id: number,
    name: string,
    color: string,
    icon: string,
    isEditable: boolean
  ): Promise<Category> {
    const result = await pool.query(
      "UPDATE categories SET name = $1, color = $2, icon = $3, is_editable = $4 WHERE id = $5 RETURNING *",
      [name, color, icon, isEditable, id]
    );

    const {
      id: dbId,
      name: dbName,
      color: dbColor,
      icon: dbIcon,
      is_editable: dbIsEditable,
      user_id: dbUserId,
    } = result.rows[0];
    return new Category(dbId, dbName, dbColor, dbIcon, dbUserId, dbIsEditable);
  }

  static async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM categories WHERE id = $1", [id]);
  }

  static async findAllByUserId(userId: number): Promise<Category[]> {
    const result = await pool.query(
      "SELECT * FROM categories WHERE user_id = $1",
      [userId]
    );

    return result.rows.map((row) => {
      const { id, name, color, icon, user_id, is_editable } = row;
      return new Category(id, name, color, icon, user_id, is_editable);
    });
  }
}

export default Category;
