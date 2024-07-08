import { pool } from "../config/database";
import bcrypt from "bcrypt";

class User {
  id!: number;
  username!: string;
  email!: string;
  password!: string;

  // constructor for the  class initializing the user properties.
  constructor(id: number, username: string, email: string, password: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  // method creates a new user and returns the created user item
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

  // method returns a user based on the user's email
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

  // method compares the password provided and the hashes-passsowrd stored in the databases using bcrypt
  async verifyPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  // methods fethced a user from the db based on the user id
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

  // method updates the user details provided as parametere here and leaves the existing values if not provided as paramaters
  async updateDetails(
    email: string,
    username: string,
    newPassword: string
  ): Promise<void> {
    try {
      const updateFields: string[] = [];
      const params: (string | number)[] = [];

      if (email && email !== this.email) {
        updateFields.push("email = $1");
        params.push(email);
      }

      if (username && username !== this.username) {
        updateFields.push("username = $2");
        params.push(username);
      }

      if (newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        updateFields.push("password = $3");
        params.push(hashedPassword);
      }

      params.push(this.id);
      const updateQuery = `
        UPDATE users 
        SET ${updateFields.join(", ")}
        WHERE id = $4
      `;

      await pool.query(updateQuery, params);

      if (email) this.email = email;
      if (username) this.username = username;
      if (newPassword) this.password = newPassword;
    } catch (error) {
      console.error("Error updating user details:", error);
      throw new Error("Failed to update user details");
    }
  }
}

export default User;
