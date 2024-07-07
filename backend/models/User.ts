import { pool } from "../config/database";
import bcrypt from "bcrypt";

class User {
  id!: number;
  username!: string;
  email!: string;
  password!: string;

  constructor(id: number, username: string, email: string, password: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static async create(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    const {
      id,
      username: dbUsername,
      email: dbEmail,
      password: dbPassword,
    } = result.rows[0];
    return new User(id, dbUsername, dbEmail, dbPassword);
  }

  static async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const {
        id,
        username: dbUsername,
        email: dbEmail,
        password: dbPassword,
      } = result.rows[0];
      return new User(id, dbUsername, dbEmail, dbPassword);
    }
    return null;
  }

  async verifyPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  static async findById(id: number): Promise<User | null> {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      const {
        id,
        username: dbUsername,
        email: dbEmail,
        password: dbPassword,
      } = result.rows[0];
      return new User(id, dbUsername, dbEmail, dbPassword);
    }
    return null;
  }
}

export default User;
