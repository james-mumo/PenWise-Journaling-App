import { pool } from "../config/database";

class JournalEntry {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public categoryId: string,
    public date: Date,
    public userId: number
  ) {}

  //   creating new journal entry method
  static async create(
    title: string,
    content: string,
    categoryId: string, // Change 'category' to 'categoryId'
    date: Date,
    userId: number
  ): Promise<JournalEntry> {
    const result = await pool.query(
      "INSERT INTO journal_entries (title, content, category_id, date, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, content, categoryId, date, userId]
    );
    const {
      id,
      title: dbTitle,
      content: dbContent,
      category_id: dbCategoryId, // Use 'category_id' from database
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

  //   find entry by id method

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

  // Updating journal entry method
  static async update(
    id: number,
    title: string,
    content: string,
    categoryId: string, // Change 'category' to 'categoryId'
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
      category_id: dbCategoryId, // Use 'category_id' from database
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

  //   method for delting a journal entry

  static async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM journal_entries WHERE id = $1", [id]);
  }

  // find all entries for a specific user method
  static async findAllByUserId(userId: number): Promise<JournalEntry[]> {
    const result = await pool.query(
      "SELECT * FROM journal_entries WHERE user_id = $1",
      [userId]
    );

    return result.rows.map((row) => {
      const { id, title, content, category, date, user_id } = row;
      return new JournalEntry(id, title, content, category, date, user_id);
    });
  }
}

export default JournalEntry;
