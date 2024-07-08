import { pool } from "../config/database";

class JournalEntry {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public category_id: string,
    public date: Date,
    public userId: number
  ) {}

  //   method creates a new journal entry
  static async create(
    title: string,
    content: string,
    category_id: string,
    date: Date,
    userId: number
  ): Promise<JournalEntry> {
    const result = await pool.query(
      "INSERT INTO journal_entries (title, content, category_id, date, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, content, category_id, date, userId]
    );
    const {
      id,
      title: dbTitle,
      content: dbContent,
      category_id: dbCategoryId,
      date: dbDate,
      user_id: dbUserId,
    } = result.rows[0];

    return new JournalEntry(
      id,
      dbTitle,
      dbContent,
      dbCategoryId,
      dbDate,
      dbUserId
    );
  }

  //  method finds a jounral entry by id
  static async findById(id: number): Promise<JournalEntry | null> {
    const result = await pool.query(
      "SELECT * FROM journal_entries WHERE id = $1",
      [id]
    );

    if (result.rows.length > 0) {
      const { id, title, content, category, date, user_id } = result.rows[0];
      return new JournalEntry(id, title, content, category, date, user_id);
    }
    return null;
  }

  // methods updates journal entry
  static async update(
    id: number,
    title: string,
    content: string,
    categoryId: string,
    date: Date
  ): Promise<JournalEntry> {
    const result = await pool.query(
      "UPDATE journal_entries SET title = $1, content = $2, category_id = $3, date = $4 WHERE id = $5 RETURNING *",
      [title, content, categoryId, date, id]
    );

    const {
      id: dbId,
      title: dbTitle,
      content: dbContent,
      category_id: dbCategoryId,
      date: dbDate,
      user_id: dbUserId,
    } = result.rows[0];

    return new JournalEntry(
      dbId,
      dbTitle,
      dbContent,
      dbCategoryId,
      dbDate,
      dbUserId
    );
  }

  //   method deletes a journal entry

  static async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM journal_entries WHERE id = $1", [id]);
  }

  // method find all entries for a specific user basmethoded on the user id
  static async findAllByUserId(userId: number): Promise<any[]> {
    const result = await pool.query(
      "SELECT j.id, j.title, j.content, j.category_id, j.date, j.user_id, c.name AS category_name, c.color AS category_color " +
        "FROM journal_entries j " +
        "LEFT JOIN categories c ON j.category_id = c.id " +
        "WHERE j.user_id = $1",
      [userId]
    );

    return result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      content: row.content,
      category_id: row.category_id,
      date: row.date,
      userId: row.user_id,
      categoryName: row.category_name,
      categoryColor: row.category_color,
    }));
  }
}

export default JournalEntry;
