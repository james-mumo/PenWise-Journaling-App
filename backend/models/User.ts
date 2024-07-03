import { pool } from "../config/database";
import bcrypt from "bcrypt";

class User {
  id!: number;
  username!: string;
  password!: string;

  constructor(id: number, username: string, password: string) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  static async create(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword]
    );
    const { id, username: dbUsername, password: dbPassword } = result.rows[0];
    return new User(id, dbUsername, dbPassword);
  }

  static async findByUsername(username: string): Promise<User | null> {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const { id, username: dbUsername, password: dbPassword } = result.rows[0];
      return new User(id, dbUsername, dbPassword);
    }
    return null;
  }

  async verifyPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

export default User;
