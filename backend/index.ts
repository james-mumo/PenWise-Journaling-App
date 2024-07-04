import express from "express";
import authRoutes from "./routes/auth";
import journalEntryRoutes from "./routes/journalEntryRoutes";
import * as dotenv from "dotenv";
import { initDb } from "./config/database";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/journal-entries", journalEntryRoutes);

const PORT = process.env.PORT || 5000;
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server up and running at http://localhost:${PORT}`);
  });
});
