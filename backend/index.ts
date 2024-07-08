import express from "express";
import authRoutes from "./routes/auth";
import journalEntryRoutes from "./routes/journalEntryRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import * as dotenv from "dotenv";
import { initDb } from "./config/database";
import cors from "cors";

// loads env varibales and initialize the app using the express method
dotenv.config();
const app = express();

// /enables coss origin support for resoruce sharing credentials
app.use(cors({ origin: true, credentials: true }));

// app routes defined
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/category-entries", categoryRoutes);
app.use("/api/journal-entries", journalEntryRoutes);

// set server port or default to port 5000
const PORT = process.env.PORT || 5000;

// initialize the db using the "initDb" method imported then start the server
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server up and running at http://localhost:${PORT}`);
  });
});
