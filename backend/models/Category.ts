import { pool } from "../config/database";

class Category {
  constructor(
    public id: number,
    public name: string,
    public color: string,
    public userId: number,
    public isEditable: boolean
  ) {}

  // method to create a new category in the database and returns the created Category object.
  static async create(
    name: string,
    color: string,
    userId: number,
    isEditable: boolean
  ): Promise<Category> {
    const result = await pool.query(
      "INSERT INTO categories (name, color, user_id, is_editable) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, color, userId, isEditable]
    );

    const {
      id,
      name: dbName,
      color: dbColor,
      user_id: dbUserId,
      is_editable: dbIsEditable,
    } = result.rows[0];
    return new Category(id, dbName, dbColor, dbUserId, dbIsEditable);
  }

  // method to find a category by its ID in the database and returns the Category object if found, otherwise returns null.
  static async findById(id: number): Promise<Category | null> {
    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [
      id,
    ]);

    if (result.rows.length > 0) {
      const { id, name, color, user_id, is_editable } = result.rows[0];
      return new Category(id, name, color, user_id, is_editable);
    }
    return null;
  }

  // method to update an existing category in the database and returns the updated Category object.
  static async update(
    id: number,
    name: string,
    color: string,
    isEditable: boolean
  ): Promise<Category> {
    const result = await pool.query(
      "UPDATE categories SET name = $1, color = $2, is_editable = $3 WHERE id = $4 RETURNING *",
      [name, color, isEditable, id]
    );

    const {
      id: dbId,
      name: dbName,
      color: dbColor,
      is_editable: dbIsEditable,
      user_id: dbUserId,
    } = result.rows[0];
    return new Category(dbId, dbName, dbColor, dbUserId, dbIsEditable);
  }

  // method of deleting a category entry based on id
  static async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM categories WHERE id = $1", [id]);
  }

  // elonging to a specific user in the database
  static async findAllByUserId(userId: number): Promise<Category[]> {
    const result = await pool.query(
      "SELECT * FROM categories WHERE user_id = $1",
      [userId]
    );

    return result.rows.map((row) => {
      const { id, name, color, user_id, is_editable } = row;
      return new Category(id, name, color, user_id, is_editable);
    });
  }

  // Retrieves categories with the count of associated journal entries for a specific user by use of an "inner join"
  static async getCategoriesWithEntryCount(userId: number): Promise<any[]> {
    const result = await pool.query(
      "SELECT c.id, c.name, c.color, c.user_id, c.is_editable, COUNT(j.id) AS entry_count " +
        "FROM categories c " +
        "LEFT JOIN journal_entries j ON c.id = j.category_id AND j.user_id = $1 " +
        "WHERE c.user_id = $1 " +
        "GROUP BY c.id",
      [userId]
    );

    return result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      color: row.color,
      userId: row.user_id,
      isEditable: row.is_editable,
      entryCount: parseInt(row.entry_count) || 0,
    }));
  }
}

export default Category;
